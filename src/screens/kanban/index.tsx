import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/use-kanbans";
import { useKanbansSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();

  const { data: kanbans } = useKanbans(useKanbansSearchParams());

  return (
    <div>
      <h3>{currentProject?.name}看板</h3>
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnContainer>
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
