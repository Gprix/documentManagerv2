"use client";

import { ArchiveProps } from "./Archive.types";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import EmptyState from "@/components/global/EmptyState/EmptyState";
import { useFetchWorkspaceDocuments } from "@/services/document/document.service.hooks";
import { useAuthStore } from "@/stores/auth.store";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { jn } from "@/utils/common.utils";
import { getPreviewNodesUtility } from "@/utils/document.utils";

export const Archive = (props: ArchiveProps) => {
  const { className } = props;
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const { uid: workspaceId = "" } = selectedWorkspace ?? {};
  const uid = useAuthStore((s) => s.uid);
  const { data: documents } = useFetchWorkspaceDocuments(workspaceId, {
    enabled: !!uid && workspaceId.length > 0,
  });

  const renderDocuments = () => {
    return (
      <ul className="w-full flex-wrap flex gap-8 px-6">
        {!documents?.length ? (
          <EmptyState description="Crea un acta para comenzar a trabajar" />
        ) : null}
        {documents?.map((document) => {
          const { uid, documentProtocol, title, documentData } = document;

          const previewNodes = getPreviewNodesUtility(documentData);

          return (
            <DocumentPreview
              key={uid}
              documentId={uid}
              previewNodes={previewNodes}
              documentProtocol={documentProtocol}
              documentName={title}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <section className={jn("Archive", className)}>
      <h2 className="Documents__subtitle">Directorio principal</h2>
      {renderDocuments()}
    </section>
  );
};
