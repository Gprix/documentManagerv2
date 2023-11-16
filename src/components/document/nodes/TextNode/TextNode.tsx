"use client";

import { MouseEvent, useEffect, useState } from "react";

import { TextNodeProps } from "./TextNode.types";
import { TextType } from "./TextNode.types";
import { BaseNode } from "../BaseNode/BaseNode";
import { SecondaryMenu } from "@/components/ui/SecondaryMenu/SecondaryMenu";
import { useDocumentStore } from "@/stores/document.store";
import { jn } from "@/utils/common.utils";

export const TextNode = (props: TextNodeProps) => {
  const { className, isEditable = true } = props;
  const { data, lineNumber, nodeNumber, onNodeUpdate } = props;
  const [nodeStyle, setNodeStyle] = useState<TextType>("span");
  const [value, setValue] = useState("");
  const selectedDocument = useDocumentStore((s) => s.selectedDocument);

  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);

  const secondaryMenuOptions = [
    {
      name: "Título",
      action: () => setNodeStyle("h1"),
    },
    {
      name: "Subtítulo",
      action: () => setNodeStyle("h2"),
    },
    {
      name: "Sección",
      action: () => setNodeStyle("h3"),
    },
    {
      name: "Texto",
      action: () => setNodeStyle("span"),
    },
    {
      name: "Texto largo",
      action: () => setNodeStyle("longText"),
    },
    {
      name: "Párrafo",
      action: () => setNodeStyle("p"),
    },
  ];

  const changeStyleHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setOrigin({ x: e.pageX, y: e.pageY });
    setShowSecondaryMenu(true);
  };

  const handleUpdate = (updatedValue: string) => {
    if (!onNodeUpdate) return;
    if (!selectedDocument) return;

    onNodeUpdate({
      nodeNumber,
      lineNumber,
      isFullLine: false,
      type: "text",
      style: nodeStyle,
      value: updatedValue,
    });
  };

  // load data from props
  useEffect(() => {
    if (!data) return;

    const { style, value } = data;
    setNodeStyle(style);
    setValue(value);
  }, [data]);

  return (
    <>
      <BaseNode
        className="TextNode"
        contentClassName={jn("pl-2 pr-3 pt-1 flex", className)}
        nodeNumber={nodeNumber}
        lineNumber={lineNumber}
        isEditable={isEditable}
      >
        <button
          onClick={(e) => changeStyleHandler(e)}
          className={jn(
            "block text-sm mr-2 bg-transparent transition-all rounded-lg",
            "w-0 opacity-0 px-2 pt-1 mb-1 text-gray-500",
            "hover:bg-surf-contrast hover:cursor-pointer hover:text-txt-accent",
            "group-hover:opacity-100 group-hover:w-auto"
          )}
        >
          {nodeStyle}
        </button>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleUpdate(e.target.value);
          }}
          type="text"
          placeholder="Lorem ipsum..."
          className="block font-light text-txt text-sm no-focus-outline w-full bg-transparent border-b border-surf-semi-contrast mb-1"
        />
      </BaseNode>
      {showSecondaryMenu ? (
        <SecondaryMenu
          top={origin.y}
          left={origin.x - 140}
          onDismiss={() => setShowSecondaryMenu(false)}
        >
          <ul role="listbox">
            {secondaryMenuOptions.map((option) => {
              const { name, action } = option;

              const actionHandler = () => {
                action();
                setShowSecondaryMenu(false);
              };

              return (
                <li key={name}>
                  <button
                    className="context-menu__item"
                    onClick={() => actionHandler()}
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
