import { IKanban } from "types/IKanban";
import { useTasks } from "utils/use-tasks";
import { useTasksSearchParams } from "./util";
import { useTaskTypes } from "utils/use-task-type";
import TaskIcon from "assets/task.svg";
import BugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

export const TaskTypeIcon = ({ typeId }: { typeId: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === typeId)?.name;
  if (!name) return null;
  return <img src={name === "task" ? TaskIcon : BugIcon} alt="" />;
};

export const KanbanColumn = ({ kanban }: { kanban: IKanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <h1>{kanban.name}</h1>
      <TasksContainer>
        {tasks?.map((task) => {
          return (
            <Card key={task.id} style={{ marginBottom: "0.5rem" }}>
              <div>{task.name}</div>
              <TaskTypeIcon typeId={task.typeId} />
            </Card>
          );
        })}
      </TasksContainer>
    </Container>
  );
};
export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  padding: 0.7rem 0.7rem 1rem;
`;

export const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
