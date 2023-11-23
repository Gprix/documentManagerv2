import { BaseNodeProps } from "./BaseNode.types";
import { jn } from "@/utils/common.utils";

export const BaseNode = (props: BaseNodeProps) => {
  const { className, children, contentClassName } = props;
  const { isEditable = true } = props;

  return (
    <div
      className={jn(
        "BaseNode",
        !isEditable ? "!pointer-events-none" : "",
        "hover:cursor-pointer group-hover:bg-surf-semi-contrast",
        "rounded-lg bg-transparent inline flex-grow overflow-clip",
        "transition-colors duration-150",
        className
      )}
    >
      <div
        className={jn(
          "w-full h-full transition-colors duration-150",
          "hover:!bg-surf-contrast/50",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
