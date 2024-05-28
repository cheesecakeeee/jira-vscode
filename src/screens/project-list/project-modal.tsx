import { Drawer } from "antd";

export const ProjectModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { isOpen, onClose } = props;
  return (
    <Drawer open={isOpen} onClose={onClose} width={"100vw"}>
      <p>Some contents...</p>
    </Drawer>
  );
};
