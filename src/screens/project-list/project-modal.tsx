import { Drawer } from "antd";
import { useProjectModalParams } from "./util";

export const ProjectModal = () => {
  const { close, projectCreate } = useProjectModalParams();
  return (
    <Drawer open={projectCreate} onClose={close} width={"100vw"}>
      <p>Some contents...</p>
    </Drawer>
  );
};
