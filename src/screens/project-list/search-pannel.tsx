/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";

export interface IUser {
  name: string;
  id: string;
  token: string;
}

interface ISearchPannelProps {
  params: {
    name: string;
    personId: string;
  };
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
        <Select
          id=""
          value={params.personId}
          onChange={(value) => setParams({ ...params, personId: value })}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users?.map((user) => {
            return (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
