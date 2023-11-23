import { useEffect, useRef } from "react";

import { NewModalProps } from "./Modal.types";
import { jn } from "@/utils/common.utils";

const NewModal = (props: NewModalProps) => {
  const { className, children } = props;
  const { title, onClose, isOpened = false } = props;
  const { showCloseButton = true } = props;
  const { closeButtonClassName } = props;
  const internalRef = useRef<HTMLDialogElement>(null);

  const onCloseHandler = () => {
    onClose?.();
    if (!internalRef.current) return;
    internalRef.current?.close();
  };

  useEffect(() => {
    const dialog = internalRef.current;
    if (!dialog) return;

    if (isOpened) dialog.showModal();
    else dialog.close();

    return () => {
      dialog.close();
    };
  }, [isOpened]);

  return (
    <dialog
      ref={internalRef}
      className={jn(
        "Modal",
        "bg-surf p-4 m-auto animate-modal text-txt border border-surf-semi-contrast",
        "open:flex open:flex-col rounded-lg",
        "backdrop:bg-bck/50",
        // TODO: esto es un fix para safari aparentemente
        // "max-h-[100dvh]"
        "max-h-screen max-w-full overflow-hidden self-center",
        "focus:outline-none",
        className
      )}
    >
      <div
        className={jn(
          "Modal__content",
          "relative flex h-full flex-col overflow-hidden"
        )}
      >
        <header
          className={jn(
            "Modal__header",
            "relative flex shrink-0 flex-nowrap justify-between"
          )}
        >
          <div className="mb-4 flex w-full items-center gap-x-2">
            <p
              className={jn(
                "Modal__header__title",
                "flex-1 text-center text-xl font-medium"
              )}
            >
              {title}
            </p>
            <div className={jn("", closeButtonClassName)}>
              {showCloseButton ? (
                <p className="hover:cursor-pointer" onClick={onCloseHandler}>
                  &times;
                </p>
              ) : null}
            </div>
          </div>
        </header>
        <main className={jn("Modal__body", "flex-1")}>
          <div className="flex flex-col">{children}</div>
        </main>
        {/* <footer className={jn("Modal__footer", "shrink-0")}></footer> */}
      </div>
    </dialog>
  );
};

export default NewModal;
