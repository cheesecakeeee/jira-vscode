import { useLocation } from "react-router";
import { useProjectDetails } from "utils/use-projects";

// 获取url中的id
export const useGetProjectIdInUrl = () => {
  const { pathname } = useLocation();
  // 由于该正则表达式中使用了小括号（），在此处的作用为分组。所以match()的结果是带有分组特征的。
  // 返回的数组包含多个元素，第一个元素是以贪婪模式找到的最长的匹配，之后的元素依次为该匹配中的第一、第二、第三 …个分组，
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

// 获取指定id列表项详情
export const useProjectInUrl = () => useProjectDetails(useGetProjectIdInUrl());

export const useKanbansSearchParams = () => ({
  projectId: useGetProjectIdInUrl(),
});

export const useKanbansQueryKey = () => ["kanbans", useKanbansSearchParams()];

export const useTasksSearchParams = () => ({
  projectId: useGetProjectIdInUrl(),
});
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
