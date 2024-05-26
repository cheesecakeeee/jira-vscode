import { useUsers } from "utils/use-users";
import { IdSelect } from "./id-select";
import React from "react";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect {...props} options={users || []} />;
};
