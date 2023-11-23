import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";

import { LineProps } from "./Line.types";
import { NumberInputNode } from "../nodes/NumberInputNode/NumberInputNode";
import { TextBlockNode } from "../nodes/TextBlockNode/TextBlockNode";
import { TextInputNode } from "../nodes/TextInputNode/TextInputNode";
import { TextNode } from "../nodes/TextNode/TextNode";
import { SecondaryMenu } from "@/components/ui/SecondaryMenu/SecondaryMenu";
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

  const secondaryMenuOptions: { name: string; actionType: NodeType }[] = [
    {
      name: "Nodo de texto",
      actionType: "text",
    },
    {
      name: "Insertar bloque de texto",
      actionType: "textBlock",
    },
    {
      name: "Entrada de texto",
      actionType: "textInput",
    },
    {
      name: "Entrada de número",
      actionType: "numberInput",
    },
  ];

  const AddNode = () => {
    const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
    const [origin, setOrigin] = useState({ x: 0, y: 0 });
    const isCursorPastMiddle = useMemo(() => {
      return origin.x > window.innerWidth / 2;
    }, [origin]);

    const addNodeHandler = (e: MouseEvent<HTMLButtonElement>) => {
      setOrigin({ x: e.pageX, y: e.pageY });
      setShowSecondaryMenu(true);
    };

    return (
      <>
        <button
          className={jn(
            "bg-surf-semi-contrast/60 rounded-lg px-4 min-h-[32px]",
            "transition-all duration-150",
            "hover:cursor-pointer hover:bg-surf-semi-contrast",
            "opacity-100 group-hover:opacity-100",
            "disabled:opacity-30"
          )}
          onClick={addNodeHandler}
        >
          <span className="select-none text-txt">+</span>
        </button>
        {showSecondaryMenu ? (
          <SecondaryMenu
            top={origin.y}
            // TODO: find a way to calculate the width of the menu
            left={!isCursorPastMiddle ? origin.x - 140 : origin.x - 345}
            onDismiss={() => setShowSecondaryMenu(false)}
          >
            <ul role="listbox">
              {secondaryMenuOptions.map((option) => {
                const { name, actionType } = option;

                return (
                  <li key={name}>
                    <button
                      className="context-menu__item"
                      onClick={() => bindNode(undefined, actionType)}
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </SecondaryMenu>
        ) : null}
      </>
    );
  };

  console.log({ lineNumberFromProps, l: nodes.length });

  const bindNode = useCallback(
    (nodeData: DocumentNodeRawData | undefined, nodeType?: NodeType) => {
      const { type, lineNumber, nodeNumber } = nodeData ?? {};
      const selector = type ?? nodeType;

      console.log({ type, nodeType, lineNumber, nodeNumber });

      const _lineNumber = lineNumber ?? lineNumberFromProps;
      console.log({ _lineNumber });

      switch (selector) {
        case "text":
          setNodes((prevNodes) => {
            const _nodeNumber = nodeNumber ?? prevNodes.length;
            console.log({ _nodeNumber });
            return [
              ...prevNodes,
              <TextNode
                key={`${selector}-node-${_nodeNumber}-${_lineNumber}`}
                data={nodeData as TextNodeRawData}
                lineNumber={_lineNumber}
                nodeNumber={_nodeNumber}
                onNodeUpdate={onNodeUpdate}
                isEditable={isEditable}
              />,
            ];
          });
          break;

        case "textBlock":
          setNodes((prevNodes) => {
            const _nodeNumber = nodeNumber ?? prevNodes.length;
            return [
              ...prevNodes,
              <TextBlockNode
                key={`text-block-node-${_nodeNumber}-${_lineNumber}`}
                data={nodeData as TextBlockNodeRawData}
                lineNumber={_lineNumber}
                nodeNumber={_nodeNumber}
                onNodeUpdate={onNodeUpdate}
                isEditable={isEditable}
              />,
            ];
          });
          break;

        case "textInput":
          setNodes((prevNodes) => {
            const _nodeNumber = nodeNumber ?? prevNodes.length;
            return [
              ...prevNodes,
              <TextInputNode
                key={`text-input-node-${_nodeNumber}-${_lineNumber}`}
                data={nodeData as TextInputNodeRawData}
                lineNumber={_lineNumber}
                nodeNumber={_nodeNumber}
                onNodeUpdate={onNodeUpdate}
                isEditable={isEditable}
              />,
            ];
          });
          break;

        case "numberInput":
          setNodes((prevNodes) => {
            const _nodeNumber = nodeNumber ?? prevNodes.length;
            return [
              ...prevNodes,
              <NumberInputNode
                key={`number-input-node-${_nodeNumber}-${_lineNumber}`}
                data={nodeData as NumberInputNodeRawData}
                nodeNumber={_nodeNumber}
                lineNumber={_lineNumber}
                onNodeUpdate={onNodeUpdate}
                isEditable={isEditable}
              />,
            ];
          });
          break;
      }
    },
    [lineNumberFromProps, onNodeUpdate, isEditable]
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
      <AddNode />
    </div>
  );
};

export default Line;
