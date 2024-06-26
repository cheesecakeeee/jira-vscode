import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/use-projects";
import { ButtonNoPadding } from "./lib";
import { useProjectModalParams } from "screens/project-list/util";

export const ProjectPopover = () => {
  const { data: projects } = useProjects();

  const pinedProjects = projects?.filter((project) => project.pin);

  const { open } = useProjectModalParams();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinedProjects?.map((project) => {
          return (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name} />
            </List.Item>
          );
        })}
      </List>
      <Divider />
      <ButtonNoPadding type={"link"} onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <div>
      <Popover placement="bottom" content={content}>
        <span>项目</span>
      </Popover>
    </div>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
