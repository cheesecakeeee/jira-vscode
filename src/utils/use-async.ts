import { useState } from "react";

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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState({
    ...defaultIntialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      error: null,
      stat: "success",
    });
  const setError = (error: Error) =>
    setState({
      data: null,
      error,
      stat: "error",
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then()) {
      throw new Error("请传入promise");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    run,
    setData,
    setError,
    ...state,
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
  };
};
