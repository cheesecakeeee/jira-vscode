import { Dropdown, Table, TableProps } from "antd";
import { IUser } from "./search-pannel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProjects } from "utils/use-projects";
import { ButtonNoPadding } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

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
  refresh: () => void;
}

export const List = ({ users, ...props }: IListProps) => {
  const { mutate } = useEditProjects();

  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);

  const dispatch = useDispatch();

  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckChanged={pinProject(project.id)}
              />
            );
          },
        },
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
        {
          render() {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "edit",
                      label: (
                        <ButtonNoPadding
                          type="link"
                          onClick={() =>
                            dispatch(projectListActions.openProjectModal())
                          }
                        >
                          编辑
                        </ButtonNoPadding>
                      ),
                    },
                    {
                      key: "delete",
                      label: (
                        <ButtonNoPadding type="link">删除</ButtonNoPadding>
                      ),
                    },
                  ],
                }}
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
