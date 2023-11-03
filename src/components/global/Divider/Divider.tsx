import { jn } from "@/utils/common.utils";
import { DividerProps as Props } from "./Divider.types";

const Divider: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className={jn("Divider", "bg-surf-contrast h-[1px]", className)} />
  );
};

export default Divider;
