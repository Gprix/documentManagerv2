"use client";

import { useEffect } from "react";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { ArchiveProps } from "./Archive.types";
import { getPreviewNodesUtility } from "@/utils/document.utils";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { useFetchWorkspaceDocuments } from "@/services/document/document.service.hooks";
import { useAuthStore } from "@/stores/auth.store";
import { useDocumentStore } from "@/stores/document.store";

export const Archive = (props: ArchiveProps) => {
  const { className = "" } = props;
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const { uid: workspaceId = "" } = selectedWorkspace ?? {};
  const uid = useAuthStore((s) => s.uid);
  const { data: documents } = useFetchWorkspaceDocuments(workspaceId, {
    enabled: !!uid && workspaceId.length > 0,
  });
  console.log({ documents });
  const setArchiveDocuments = useDocumentStore((s) => s.setArchiveDocuments);
  const archiveDocuments = useDocumentStore((s) => s.archiveDocuments);
  console.log({ archiveDocuments });

  const renderDocuments = () => {
    return (
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
    );
  };

  useEffect(() => {
    if (!documents) return;
    setArchiveDocuments(documents);
  }, [documents]);

  return (
    <section className={`Archive ${className}`}>
      <h2 className="Documents__subtitle">Directorio principal</h2>
      {renderDocuments()}
    </section>
  );
};
