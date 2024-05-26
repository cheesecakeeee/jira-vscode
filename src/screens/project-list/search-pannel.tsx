/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
import { IProject } from "./list";
import { UserSelect } from "components/user-select";

export interface IUser {
  name: string;
  id: number;
  token: string;
  email: string;
  title: string;
  organization: string;
}

interface ISearchPannelProps {
  params: Partial<Pick<IProject, "name" | "personId">>;
  setParams: (params: ISearchPannelProps["params"]) => void;
  users: IUser[];
}

export const SearchPannel = ({
  params,
  setParams,
  users,
}: ISearchPannelProps) => {
  return (
    <Form layout="inline" css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={params.name}
          onChange={(evt) => setParams({ ...params, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={params.personId}
          onChange={(value) => setParams({ ...params, personId: value })}
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};
