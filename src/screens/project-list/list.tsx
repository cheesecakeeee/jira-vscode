import { Dropdown, Modal, Table, TableProps } from "antd";
import { IUser } from "types/IUser";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProjects, useEditProjects } from "utils/use-projects";
import { ButtonNoPadding } from "components/lib";
import { useProjectModalParams, useProjectsQueryKey } from "./util";
import { IProject } from "types/IProject";

interface IListProps extends TableProps<IProject> {
  users: IUser[];
}

export const List = ({ users, ...props }: IListProps) => {
  const { mutate } = useEditProjects(useProjectsQueryKey());

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

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
          render(value: any, project: IProject) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

// useDeleteProjects
const More = ({ project }: { project: IProject }) => {
  const { startEdit } = useProjectModalParams();
  const { mutate: deleteProject } = useDeleteProjects(useProjectsQueryKey());
  const editProject = (id: number) => () => startEdit(id);
  const comfirmDeleteProject: any = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "edit",
            label: (
              <ButtonNoPadding type="link" onClick={editProject(project.id)}>
                编辑
              </ButtonNoPadding>
            ),
          },
          {
            key: "delete",
            label: (
              <ButtonNoPadding
                type="link"
                onClick={() => comfirmDeleteProject(project.id)}
              >
                删除
              </ButtonNoPadding>
            ),
          },
        ],
      }}
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};
