import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultIntialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

// ???
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef],
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultIntialState,
      ...initialState,
    },
  );

  // useState传入函数时要嵌套一层函数，避免函数惰性初始化执行
  const [retry, setRetry] = useState(() => () => {});
  // ???
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        error: null,
        stat: "success",
      }),
    [safeDispatch],
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        data: null,
        error,
        stat: "error",
      }),
    [safeDispatch],
  );

  const run = useCallback(
    async (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise");
      }
      // setRetry也会有惰性初始化会自动执行函数，所以也要嵌套一层函数，
      // 每次执行promise都保存起来，但没有获得promise执行结果，
      // 要传入promise执行体，才能在retry并执行成功上一次promise的结果
      setRetry(() => () => {
        if (runConfig?.retry) {
          // 递归调用run，透传runConfig，使具有runConfig参数的run方法允许重新调用
          run(runConfig?.retry(), runConfig);
        }
      });

      // ???
      safeDispatch({ stat: "loading" });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch],
  );
  return {
    run,
    retry,
    setData,
    setError,
    ...state,
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
  };
};
