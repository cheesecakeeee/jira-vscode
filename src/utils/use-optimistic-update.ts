import { InvalidateQueryFilters, QueryKey, useQueryClient } from "react-query";

export const useOptimisticConfig = (
  queryKey: QueryKey & InvalidateQueryFilters,
  callback: (target: any, old?: any[]) => any[],
) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 乐观更新
    async onMutate(target: any) {
      // 取出 key 对应的缓存（未被乐观更新的真实数据） 并返回
      const previousItems = queryClient.getQueryData(queryKey);
      // 设置react-query的缓存，根据id查找到类目，设置为预期操作 target
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        // 新增、修改、删除对缓存的操作方法不同，作为传参传入，其余都是可复用的
        return callback(target, old);
      });
      return { previousItems };
    },
    // 回滚机制，如果用户执行异步请求操作失败，就把缓存的数据恢复到未被乐观更新的值
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteOptimistic = (queryKey: QueryKey) =>
  useOptimisticConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || [],
  );

export const useEditOptimistic = (queryKey: QueryKey) =>
  useOptimisticConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item,
      ) || [],
  );

export const useAddOptimistic = (queryKey: QueryKey) =>
  useOptimisticConfig(queryKey, (target, old) => (old ? [...old, target] : []));
