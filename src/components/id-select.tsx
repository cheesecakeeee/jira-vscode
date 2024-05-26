import { Select } from "antd";
import { Raw } from "types";

type SelectType = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectType, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  options?: { name: string; id: number }[];
  defaultOptionName?: string;
}

/**
 * value 可以可以传入多种类型值
 * onChange 只会回调number | undefined值
 * isNaN(Number(value)) 为true 表示值为 undefined 选择默认类型
 * 选择默认类型，onChange 回调 undefined
 *  */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, options, defaultOptionName, ...restProps } = props;
  return (
    <Select
      {...restProps}
      value={options?.length ? toNumber(value) : 0}
      onChange={(val) => onChange(toNumber(val) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => {
        return (
          <Select.Option key={option.id} value={option.id}>
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
