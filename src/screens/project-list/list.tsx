import { Table } from "antd";
import { IUser } from "./search-pannel";

export interface IProject {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}

interface IListProps {
  list: IProject[];
  users: IUser[];
}

export const List = ({ list, users }: IListProps) => {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
