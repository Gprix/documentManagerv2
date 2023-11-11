import { jn } from "@/utils/common.utils";
import { BaseNodeProps } from "./BaseNode.types";

export const BaseNode = (props: BaseNodeProps) => {
  const { className, children, contentClassName } = props;
  const { isEditable = true } = props;

  return (
    <div
      className={jn(
        "BaseNode",
        !isEditable ? "!pointer-events-none" : "",
        "hover:cursor-pointer group-hover:bg-gray-50",
        "rounded-lg bg-transparent inline flex-grow overflow-clip",
        "transition-colors duration-150",
        className
      )}
    >
      <div
        className={jn(
          "w-full h-full transition-colors duration-150",
          "hover:bg-gray-200",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
