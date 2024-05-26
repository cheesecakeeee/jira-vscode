import { Select } from "antd";
import { Raw } from "types";

type SelectType = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectType, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  options: { name: string; id: number }[];
  defaultOptionName?: string;
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, options, defaultOptionName, ...restProps } = props;
  return (
    <Select
      {...restProps}
      value={toNumber(value)}
      onChange={(val) => onChange(toNumber(val) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => {
        return (
          <Select.Option key={option.id} value={String(option.id)}>
            {option.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

const toNumber = (value: unknown) => {
  return isNaN(Number(value)) ? 0 : Number(value);
};
