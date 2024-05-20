import { Table } from "antd";
import { IUser } from "./search-pannel";
import dayjs from "dayjs";

export interface IProject {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
  pin: boolean;
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
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          dataIndex: "created",
          key: "created",
          render(value: any, project: IProject) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
