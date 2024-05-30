import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions } from "./project-list.slice";
import { selectProjectModalOpen } from "store";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);

  return (
    <Drawer
      open={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      width={"100vw"}
    >
      <p>Some contents...</p>
    </Drawer>
  );
};
