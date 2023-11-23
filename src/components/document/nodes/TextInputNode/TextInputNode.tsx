import { useEffect, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { TextInputNodeProps } from "./TextInputNode.types";
import { useDocumentStore } from "@/stores/document.store";
import { jn } from "@/utils/common.utils";

export const TextInputNode = (props: TextInputNodeProps) => {
  const { className, isEditable } = props;
  const { data, lineNumber, nodeNumber, onNodeUpdate } = props;
  const selectedDocument = useDocumentStore((s) => s.selectedDocument);
  const [value, setValue] = useState("");
  const [linkingKey, setLinkingKey] = useState<string | null>(null);
  const linkedStyle = linkingKey ? "bg-primaryLight" : "";
  const linkedInputStyle = linkingKey ? "border-primary text-primary" : "";

  const handleUpdate = (updatedValue: string) => {
    if (!onNodeUpdate) return;
    if (!selectedDocument) return;

    onNodeUpdate({
      lineNumber,
      nodeNumber,
      isFullLine: false,
      type: "textInput",
      linkedTo: linkingKey,
      value: updatedValue,
    });
  };

  useEffect(() => {
    if (!data) return;

    const { linkedTo, value } = data;
    setValue(value);
    setLinkingKey(linkedTo);
  }, [data]);

  return (
    <BaseNode
      className="TextInputNode"
      contentClassName={jn(
        "px-3 pt-1",
        "hover:cursor-text",
        "flex flex-col justify-center",
        linkedStyle,
        className
      )}
      nodeNumber={nodeNumber}
      lineNumber={lineNumber}
      isEditable={isEditable}
    >
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleUpdate(e.target.value);
        }}
        type="text"
        placeholder="Lorem ipsum..."
        className={`font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black ${linkedInputStyle} mb-1`}
      />
    </BaseNode>
  );
};
