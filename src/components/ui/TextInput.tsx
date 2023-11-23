import { jn } from "@/utils/common.utils";
import React, { InputHTMLAttributes, forwardRef } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  label?: string;
  subLabel?: string;
  errorMessage?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { className, labelClassName, errorClassName } = props;
  const { label, subLabel, errorMessage, ...rest } = props;

  return (
    <div className="TextInput">
      {label?.length ? (
        <label
          className={jn(
            "TextInput__label",
            "block font-semibold text-typography-label mb-1 text-sm",
            labelClassName
          )}
        >
          {label}
        </label>
      ) : null}
      {subLabel?.length ? (
        <p className="block text-sm opacity-60">{subLabel}</p>
      ) : null}
      <input
        ref={ref}
        {...rest}
        className={jn(
          "TextInput__input",
          "no-focus-outline text-txt placeholder-surf-contrast w-full text-sm font-light border-b border-surf-contrast bg-transparent",
          className
        )}
      />
      <p
        className={jn(
          "TextInput__error",
          "text-xs mt-1 text-error",
          errorClassName
        )}
      >
        {errorMessage}
      </p>
    </div>
  );
});

TextInput.displayName = "TextInput";
export default TextInput;
