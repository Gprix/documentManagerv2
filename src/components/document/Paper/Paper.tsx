"use client";

import { PaperProps } from "./Paper.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDocumentStore } from "@/stores/document.store";
import { Document, DocumentNodeRawData } from "@/types/document.types";
import { NodeRawData } from "@/types/document.types";
import Line from "../Line/Line";
import { jn } from "@/utils/common.utils";

export const Paper = (props: PaperProps) => {
  const { className, document, isEditing: isEditable = true } = props;
  const selectedDocument = useDocumentStore((s) => s.selectedDocument);
  const setSelectedDocument = useDocumentStore((s) => s.setSelectedDocument);
  const { documentData: documentDataProps } = document ?? {};
  // TODO: switch to object (hash map like) instead of array
  const [lines, setLines] = useState<React.ReactNode[]>([]);

  // TODO: check if this is the appropriate way to check it.
  const isMounted = useRef(false);

  const renderAddLineButton = () => {
    return (
      <button
        onClick={() => bindLine(undefined)}
        className={jn(
          "bg-gray-200 text-black rounded-lg px-4 min-h-[32px]",
          "hover:bg-gray-300 hover:cursor-pointer",
          "transition-color duration-150"
        )}
      >
        +
      </button>
    );
  };

  /**
   * Callback to update node data
   */
  const onNodeUpdate = useCallback(
    (newNodeData: DocumentNodeRawData) => {
      if (!selectedDocument) return;

      const { documentData } = selectedDocument;
      const oldDocumentData = structuredClone(documentData);

      // updating old or existing nodes
      const updatedDocumentData = oldDocumentData.map((oldNodeData) => {
        const { nodeNumber, lineNumber } = oldNodeData;
        const { nodeNumber: newNodeNumber } = newNodeData;
        const { lineNumber: newLineNumber } = newNodeData;

        const isMatchingNode =
          nodeNumber === newNodeNumber && lineNumber === newLineNumber;

        if (!isMatchingNode) return oldNodeData;
        return newNodeData;
      });

      // adding new nodes (only if it doesn't exist)
      const isExistingNode = oldDocumentData.find(
        (oldNodeData) =>
          oldNodeData.nodeNumber === newNodeData.nodeNumber &&
          oldNodeData.lineNumber === newNodeData.lineNumber
      );
      if (!isExistingNode) {
        updatedDocumentData.push(newNodeData);
      }

      const newDocument: Document = {
        ...selectedDocument,
        documentData: updatedDocumentData,
      };

      setSelectedDocument(newDocument);
    },
    [selectedDocument, setSelectedDocument]
  );

  /**
   * Callback to instance a new interactive line
   */
  const bindLine = useCallback(
    (lineData: NodeRawData[] | undefined) => {
      setLines((prevLines) => [
        ...prevLines,
        <Line
          key={`line-${prevLines.length}`}
          data={lineData}
          lineNumber={prevLines.length}
          onNodeUpdate={onNodeUpdate}
          isEditable={isEditable}
        />,
      ]);
    },
    [isEditable, onNodeUpdate]
  );

  // Sort and map document data to node lines (initial render)
  useEffect(() => {
    if (isMounted.current) return;
    if (!documentDataProps) return;

    const sortedNodes = [...documentDataProps].sort(
      (a, b) => a.nodeNumber - b.nodeNumber
    );

    const groupedLines: {
      rowIndex: number;
      nodes: NodeRawData[];
    }[] = [];

    sortedNodes.forEach((nodeData) => {
      const { lineNumber } = nodeData;

      // Find the line with the matching rowIndex
      const lineIndex = groupedLines.findIndex(
        (lineData) => lineData.rowIndex === lineNumber
      );

      if (lineIndex === -1) {
        // Line doesn't exist, create a new line data
        groupedLines.push({
          rowIndex: lineNumber,
          nodes: [nodeData],
        });
      } else {
        // Line exists, add the node data to the existing line
        groupedLines[lineIndex].nodes.push(nodeData);
      }
    });

    // Bind lines and nodes based on the data
    groupedLines.forEach((lineData) => {
      lineData.nodes.sort((a, b) => a.nodeNumber - b.nodeNumber);
      bindLine(lineData.nodes);
    });

    isMounted.current = true;
  }, [documentDataProps, bindLine]);

  return (
    <article
      className={`Paper flex flex-col gap-y-2 bg p-6 rounded-lg ${className}`}
    >
      {lines.map((line) => line)}
      {renderAddLineButton()}
    </article>
  );
};
