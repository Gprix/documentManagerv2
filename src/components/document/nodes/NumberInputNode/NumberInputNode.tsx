import { useEffect, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { NumberInputNodeProps } from "./NumberInputNode.types";
import { useDocumentStore } from "@/stores/document.store";
import { jn } from "@/utils/common.utils";

export const NumberInputNode = (props: NumberInputNodeProps) => {
  const { className, isEditable } = props;
  const { data, lineNumber, nodeNumber, onNodeUpdate } = props;
  const selectedDocument = useDocumentStore((s) => s.selectedDocument);
  const [value, setValue] = useState(0);
  const [linkingKey, setLinkingKey] = useState<string | null>(null);

  const handleUpdate = (updatedValue: number) => {
    if (!onNodeUpdate) return;
    if (!selectedDocument) return;

    onNodeUpdate({
      lineNumber,
      nodeNumber,
      isFullLine: false,
      type: "numberInput",
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
      className="NumberInputNode"
      contentClassName={jn("px-3 pt-1", "hover:cursor-text", className)}
      lineNumber={lineNumber}
      nodeNumber={nodeNumber}
      isEditable={isEditable}
    >
      <input
        onChange={(e) => {
          setValue(+e.target.value);
          handleUpdate(+e.target.value);
        }}
        value={value}
        type="number"
        placeholder="123..."
        className="font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
      />
    </BaseNode>
  );
};
