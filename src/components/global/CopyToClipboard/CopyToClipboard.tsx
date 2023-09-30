"use client";

import { useNotification } from "@/hooks/useNotification";
import { CopyToClipboardProps } from "./CopyToClipboard.types";

import ShareSVG from "images/icons/share.svg";

const CopyToClipboardButton = (props: CopyToClipboardProps) => {
  const { className = "" } = props;
  const { text, targetRef } = props;
  const { info } = useNotification();

  const handleCopyClick = async () => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(
        targetRef?.current?.innerText ?? text ?? ""
      );
      info("UID copiado al portapapeles");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className={["CopyToClipboard", "block text-xs", className].join(" ")}
      title="Copiar UID"
      onClick={handleCopyClick}
    >
      <ShareSVG />
    </button>
  );
};

export default CopyToClipboardButton;
