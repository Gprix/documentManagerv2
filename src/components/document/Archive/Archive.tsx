"use client";

import { useLayoutEffect } from "react";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { ArchiveProps } from "./Archive.types";
import { getDocumentsInWorkspace } from "@/services/document/document.service";
import { Document } from "@/types/document.types";
import { useDocument } from "@/contexts/document/document.context.hooks";
import { getPreviewNodesUtility } from "@/utils/document.utils";
import { useWorkspaceStore } from "@/stores/workspace.store";

export const Archive = (props: ArchiveProps) => {
  const { className = "" } = props;
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const { archiveDocuments, setArchiveDocuments } = useDocument();

  useLayoutEffect(() => {
    if (!selectedWorkspace) return;
    const { uid: workspaceId } = selectedWorkspace;

    const getDocuments = async () => {
      const documents = await getDocumentsInWorkspace(workspaceId);
      setArchiveDocuments(documents as Document[]);
    };

    getDocuments();
  }, [selectedWorkspace, setArchiveDocuments]);

  return (
    <section className={`Archive ${className}`}>
      <h2 className="Documents__subtitle">Directorio principal</h2>
      <ul className="w-full flex-wrap flex gap-8 px-6">
        {archiveDocuments?.map((document) => {
          const { uid, documentType, title, documentData } = document;

          const previewNodes = getPreviewNodesUtility(documentData);

          return (
            <DocumentPreview
              key={uid}
              documentId={uid}
              previewNodes={previewNodes}
              documentType={documentType}
              documentName={title}
            />
          );
        })}
      </ul>
    </section>
  );
};
