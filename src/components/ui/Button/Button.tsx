import { ButtonProps } from "./Button.types";
import { getContainerStyle, getTextStyle } from "./Button.helpers";

import LoaderSVG from "images/icons/loader.svg";

const Button = (props: ButtonProps) => {
  const { children, className } = props;
  const { onClick, leftIcon, rightIcon, type = "solid" } = props;
  const { disabled = false, isLoading = false } = props;
  const { iconStyle, textStyle } = props;

  return (
    <button
      className={`Button ${getContainerStyle(
        type
      )} block transition-all duration-500 ease-in-out ${className} ${
        disabled ? "opacity-30 hover:cursor-default" : ""
      } `}
      onClick={!disabled ? onClick : () => {}}
    >
      <div className="flex flex-nowrap items-center justify-center">
        {isLoading ? (
          <LoaderSVG className="animate-spin [&_path]:stroke-txt mr-2" />
        ) : null}
        {leftIcon ? (
          <div className={`mr-4 ${iconStyle}`}>{leftIcon}</div>
        ) : null}
        <div
          className={`${getTextStyle(
            type
          )} text-center whitespace-nowrap ${textStyle}`}
        >
          {children}
        </div>
        {rightIcon ? (
          <div className={`ml-4 ${iconStyle}`}>{rightIcon}</div>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
