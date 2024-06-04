import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModalParams } from "./util";
import { UserSelect } from "components/user-select";
import { useAddProjects, useEditProjects } from "utils/use-projects";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { close, projectModalOpen, isLoading, projectDetails } =
    useProjectModalParams();

  const title = projectDetails ? "编辑项目" : "创建项目";

  const useMutateProject = projectDetails ? useEditProjects : useAddProjects;

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...projectDetails, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  // 如果详情和表单发生变化重置表单？？？？
  useEffect(() => {
    form.setFieldsValue(projectDetails);
  }, [projectDetails, form]);

  return (
    <Drawer
      open={projectModalOpen}
      onClose={close}
      width={"100vw"}
      forceRender={true}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error}></ErrorBox>
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: "请输入项目名称！" }]}
              >
                <Input placeholder="请输入项目名称！" />
              </Form.Item>
              <Form.Item
                label="部门"
                name="organization"
                rules={[{ required: true, message: "请输入部门！" }]}
              >
                <Input placeholder="请输入部门！" />
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName={"负责人"}></UserSelect>
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  htmlType={"submit"}
                  type={"primary"}
                  loading={mutateLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
