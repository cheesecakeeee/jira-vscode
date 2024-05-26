import { Table, TableProps } from "antd";
import { IUser } from "./search-pannel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface IProject {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}

interface IListProps extends TableProps<IProject> {
  users: IUser[];
}

export const List = ({ users, ...props }: IListProps) => {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <span>
                <Link to={String(project.id)}>{project.name}</Link>
              </span>
            );
          },
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
      {...props}
    ></Table>
  );
};
