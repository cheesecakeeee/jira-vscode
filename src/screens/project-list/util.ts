import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUrlQueryParams } from "utils/url";
import { useProjectDetails } from "utils/use-projects";

// 项目列表搜索参数，每次都会创建一个新对象所以用useMemo解决依赖循环问题
export const useProjectSearchParams = () => {
  // 传入查询条件key ，返回 url的中的属性值 和 操作url的方法
  const [params, setParams] = useUrlQueryParams(["name", "personId"]);

  return [
    useMemo(() => {
      return {
        ...params,
        // personId不为0所以用undefined
        personId: Number(params.personId) || undefined,
      };
    }, [params]),
    setParams,
  ] as const;
};

export const useProjectModalParams = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);

  // 获取url中的编辑id
  const [{ projectEditById }, setProjectEditById] = useUrlQueryParams([
    "projectEditById",
  ]);

  // 编辑设置url中的编辑id
  const startEdit = (id: number) => setProjectEditById({ projectEditById: id });

  // 获取列表详情
  const { data: projectDetails, isLoading } = useProjectDetails(
    Number(projectEditById),
  );

  const open = () => setProjectCreate({ projectCreate: true });

  // 获取设置url的参数的方法
  const [_, setUrlParams] = useSearchParams();
  // 设置模态框状态标记 创建和编辑id 为空字符串
  const close = () => setUrlParams({ projectCreate: "", projectEditById: "" });

  return {
    open,
    close,
    projectModalOpen: projectCreate === "true" || !!projectEditById,
    startEdit,
    projectDetails,
    isLoading,
  };
};
