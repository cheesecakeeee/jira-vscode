import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/use-projects";

export const ProjectPopover = (props: { createProjectButton: JSX.Element }) => {
  const { data: projects } = useProjects();

  const pinedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinedProjects?.map((project) => {
          return (
            <List.Item>
              <List.Item.Meta title={project.name} />
            </List.Item>
          );
        })}
      </List>
      <Divider />
      {props.createProjectButton}
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
