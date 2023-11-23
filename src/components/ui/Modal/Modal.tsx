import { useState } from "react";
import { BackdropStyle, BackdropProps, ModalProps } from "./Modal.types";
import { jn } from "@/utils/common.utils";

export const Backdrop = (props: BackdropProps) => {
  const { backdrop = "dark" } = props;
  const { onClick } = props;

  const backdropStyle = (style: BackdropStyle) =>
    ({
      glass: "bg-glass backdrop-blur hover:cursor-pointer",
      dark: "bg-focus hover:cursor-pointer",
      none: "bg-transparent",
    }[style]);

  return (
    <div
      onClick={onClick}
      className={`Backdrop ${backdropStyle(
        backdrop
      )} z-40 full-screen overflow-hidden absolute top-0 left-0`}
    />
  );
};

export const Modal = (props: ModalProps) => {
  const { children, className = "" } = props;
  const { backdrop = "dark", type = "boxed" } = props;
  const { onClose } = props;
  const [_mouseIsOutside, setMouseIsOutside] = useState(false);

  return (
    <>
      <Backdrop backdrop={backdrop} onClick={() => onClose()} />
      <div
        className={jn(
          "Modal",
          "absolute z-50 m-auto inline-block overflow-clip",
          type === "boxed"
            ? "bg-surf rounded-lg border border-surf-semi-contrast"
            : "",
          className
        )}
        onMouseEnter={() => setMouseIsOutside(false)}
        onMouseLeave={() => setMouseIsOutside(true)}
      >
        {children}
      </div>
    </>
  );
};
