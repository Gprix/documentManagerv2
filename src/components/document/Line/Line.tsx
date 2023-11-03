import { useCallback, useEffect, useState } from "react";
import { LineProps } from "./Line.types";
import { TextBlockNode } from "../nodes/TextBlockNode/TextBlockNode";
import { TextInputNode } from "../nodes/TextInputNode/TextInputNode";
import { NumberInputNode } from "../nodes/NumberInputNode/NumberInputNode";
import { TextNode } from "../nodes/TextNode/TextNode";
import { NodeType, DocumentNodeRawData } from "@/types/document.types";
import { NumberInputNodeRawData } from "@/types/document.types";
import { TextBlockNodeRawData } from "@/types/document.types";
import { TextInputNodeRawData, TextNodeRawData } from "@/types/document.types";
import { jn } from "@/utils/common.utils";

const Line = (props: LineProps) => {
  const { className, data, onNodeUpdate } = props;
  const { lineNumber: lineNumberFromProps } = props;
  const { isEditable = true } = props;
  const [nodes, setNodes] = useState<React.ReactNode[]>([]);

  const renderAddNodeButton = () => {
    // TODO: show menu to select node type
    const selectedNodeType: NodeType = "text";

    return (
      <button
        className={jn(
          "bg-gray-200 rounded-lg px-4 min-h-[32px]",
          "transition-all duration-150",
          "hover:cursor-pointer hover:bg-gray-300",
          "opacity-100 group-hover:opacity-100",
          "disabled:opacity-30"
        )}
        onClick={() => bindNode(undefined, selectedNodeType)}
      >
        +
      </button>
    );
  };

  const bindNode = useCallback(
    (nodeData: DocumentNodeRawData | undefined, nodeType?: NodeType) => {
      const { type, lineNumber, nodeNumber } = nodeData ?? {};
      const selector = type ?? nodeType;

      switch (selector) {
        case "text":
          setNodes((prevNodes) => [
            ...prevNodes,
            <TextNode
              key={`${selector}-node-${nodeNumber}-${lineNumber}`}
              data={nodeData as TextNodeRawData}
              lineNumber={lineNumber ?? lineNumberFromProps}
              nodeNumber={nodeNumber ?? prevNodes.length}
              onNodeUpdate={onNodeUpdate}
              isEditable={isEditable}
            />,
          ]);
          break;

        case "textBlock":
          setNodes((prevNodes) => [
            ...prevNodes,
            <TextBlockNode
              onNodeUpdate={onNodeUpdate}
              lineNumber={lineNumber ?? lineNumberFromProps}
              nodeNumber={nodeNumber ?? prevNodes.length}
              data={nodeData as TextBlockNodeRawData}
              key={`text-block-node-${nodeNumber}-${lineNumber}`}
              isEditable={isEditable}
            />,
          ]);
          break;

        case "textInput":
          setNodes((prevNodes) => [
            ...prevNodes,
            <TextInputNode
              onNodeUpdate={onNodeUpdate}
              nodeNumber={nodeNumber ?? prevNodes.length}
              lineNumber={lineNumber ?? lineNumberFromProps}
              data={nodeData as TextInputNodeRawData}
              key={`text-input-node-${nodeNumber}-${lineNumber}`}
              isEditable={isEditable}
            />,
          ]);
          break;

        case "numberInput":
          setNodes((prevNodes) => [
            ...prevNodes,
            <NumberInputNode
              onNodeUpdate={onNodeUpdate}
              nodeNumber={nodeNumber ?? prevNodes.length}
              lineNumber={lineNumber ?? lineNumberFromProps}
              data={nodeData as NumberInputNodeRawData}
              key={`number-input-node-${nodeNumber}-${lineNumber}`}
              isEditable={isEditable}
            />,
          ]);
          break;
      }
    },
    [onNodeUpdate, lineNumberFromProps]
  );

  /**
   * Effect to bind nodes on mount
   */
  useEffect(() => {
    if (!data) return;

    data.forEach((nodeData) => {
      bindNode(nodeData);
    });
  }, [bindNode, data]);

  return (
    <div
      className={jn(
        "Line",
        "flex gap-x-2 shadow-gray-200 hover:shadow-transparent transition-colors duration-150 pb-2 group",
        className
      )}
    >
      {nodes}
      {renderAddNodeButton()}
    </div>
  );
};

export default Line;
