import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckChanged?: (value: boolean) => void;
}

export const Pin = (props: PinProps) => {
  const { checked, onCheckChanged, ...restPrpps } = props;
  return (
    <Rate
      {...restPrpps}
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckChanged?.(!!num)}
    />
  );
};
