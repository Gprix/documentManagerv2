import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { RecentDocumentsProps } from "./RecentDocuments.types";
import { getPreviewNodesUtility } from "@/utils/document.utils";
import { useDocumentStore } from "@/stores/document.store";
import { jn } from "@/utils/common.utils";
import { useMemo } from "react";
import EmptyState from "@/components/global/EmptyState/EmptyState";

export const RecentDocuments = (props: RecentDocumentsProps) => {
  const { className } = props;
  const recentDocumentsUids = useDocumentStore((s) => s.recentDocuments);
  const archiveDocuments = useDocumentStore((s) => s.archiveDocuments);

  const recentDocuments = useMemo(() => {
    return archiveDocuments.filter((document) =>
      recentDocumentsUids.includes(document.uid)
    );
  }, [archiveDocuments, recentDocumentsUids]);

  return (
    // TODO: check if using <summary> and <details> is a good idea
    <section className={jn("RecentDocuments", className)}>
      <h2 className="Documents__subtitle">Documentos recientes</h2>
      <ul className="flex gap-x-8 px-6">
        {recentDocuments.length === 0 ? (
          <EmptyState description="Los documentos que abras aparecerán aquí" />
        ) : null}
        {recentDocuments.map((document) => {
          const {
            uid,
            documentProtocol: documentType,
            title,
            documentData,
          } = document;

          const previewNodes = getPreviewNodesUtility(documentData);

          return (
            <DocumentPreview
              key={uid}
              documentId={uid}
              documentProtocol={documentType}
              documentName={title}
              previewNodes={previewNodes}
            />
          );
        })}
      </ul>
    </section>
  );
};
