"use client";

import { TextBlockNodeProps } from "./TextBlockNode.types";
import { BaseNode } from "../BaseNode/BaseNode";
import { useEffect, useState, useMemo } from "react";
import { useLayoutEffect } from "react";
import { useDatablocks } from "@/contexts/datablocks/datablocks.context.hooks";

import Select, { SingleValue } from "react-select";
import { getLastFromPathname, jn } from "@/utils/common.utils";
import NewBlockModal from "./NewBlockModal";
import { useDocumentStore } from "@/stores/document.store";

export const TextBlockNode = (props: TextBlockNodeProps) => {
  const { className, isEditable = true } = props;
  const { data, lineNumber, nodeNumber, onNodeUpdate } = props;
  const selectedDocument = useDocumentStore((s) => s.selectedDocument);
  const { selectedDatablocks } = useDatablocks();
  const [blockEntryId, setBlockEntryId] = useState<string | null>(null);
  const [, setTextValue] = useState("");
  const [showNewBlockModal, setShowNewBlockModal] = useState(false);

  const blocksAsOptions = useMemo(() => {
    return selectedDatablocks?.map((datablock) => ({
      value: datablock.uid,
      label: datablock.value,
    }));
  }, [selectedDatablocks]);

  const handleUpdate = (
    option: SingleValue<{ label: string; value: string }>
  ) => {
    if (!selectedDocument) return;

    const { label, value } = option ?? {};

    if (!label || !value) return;

    setTextValue(label);
    setBlockEntryId(value);

    onNodeUpdate({
      lineNumber: lineNumber,
      nodeNumber: nodeNumber,
      isFullLine: false,
      type: "textBlock",
      blockEntryId: value,
    });
  };

  useLayoutEffect(() => {
    if (!selectedDocument) return;
  }, [selectedDocument]);

  useLayoutEffect(() => {
    if (!data) return;

    const { blockEntryId } = data;
    setBlockEntryId(blockEntryId);
  }, [data]);

  useEffect(() => {
    if (!blockEntryId) return;

    const datablock = selectedDatablocks?.find(
      (datablock) => datablock.uid === blockEntryId
    );

    if (!datablock) return;

    const { value } = datablock;
    setTextValue(value);
  }, [blockEntryId, selectedDatablocks]);

  return (
    <>
      <BaseNode
        className={jn("TextBlockNode", "overflow-visible !rounded-lg")}
        contentClassName={jn(
          "hover:bg-gray-200",
          "pl-3 pr-1 pt-2 pb-1 !rounded-lg",
          className
        )}
        nodeNumber={nodeNumber}
        lineNumber={lineNumber}
        isEditable={isEditable}
      >
        <Select
          value={blocksAsOptions?.find(
            (option) => option.value === blockEntryId
          )}
          formatOptionLabel={(option) => getLastFromPathname(option.label)}
          options={blocksAsOptions}
          isSearchable
          noOptionsMessage={() => (
            <span onClick={() => setShowNewBlockModal(true)}>
              + Agregar nuevo bloque de texto
            </span>
          )}
          onChange={(option) => handleUpdate(option)}
          className="text-sm font-light"
          styles={{
            control: (provided) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
              borderRadius: "0.5rem",
              padding: "0",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none",
            }),
            menu: (provided) => ({
              ...provided,
              minWidth: "20rem",
            }),
          }}
        />
      </BaseNode>
      {showNewBlockModal ? (
        <NewBlockModal onClose={() => setShowNewBlockModal(false)} />
      ) : null}
    </>
  );
};
