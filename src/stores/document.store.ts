import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Document, DocumentProtocol } from "@/types/document.types";

interface DocumentState {
  selectedDocument: Document | undefined;
  archiveDocuments: Document[];
  recentDocuments: Document["uid"][];
}

interface DocumentActions {
  setSelectedDocument: (document: Document | undefined) => void;
  setArchiveDocuments: (documents: Document[]) => void;
  addRecentDocument: (uid: Document["uid"]) => void;
  setSelectedDocumentType: (documentType: DocumentProtocol) => void;
  reset: () => void;
}

export const useDocumentStore = create(
  persist<DocumentState & DocumentActions>(
    (set, get) => ({
      selectedDocument: undefined,
      recentDocuments: [],
      archiveDocuments: [],
      setSelectedDocument: (document: Document | undefined) => {
        set({ selectedDocument: document });
      },
      setArchiveDocuments: (documents: Document[]) => {
        set({ archiveDocuments: documents });
      },
      addRecentDocument: (uid) => {
        const recentDocuments = get().recentDocuments;
        if (recentDocuments.includes(uid)) {
          return;
        }
        set({ recentDocuments: [uid, ...recentDocuments].slice(-5) });
      },
      setSelectedDocumentType: (documentType: DocumentProtocol) => {
        const selectedDocument = get().selectedDocument;
        if (!selectedDocument) return;
        set({
          selectedDocument: {
            ...selectedDocument,
            documentProtocol: documentType,
          },
        });
      },
      reset: () => {
        set({
          selectedDocument: undefined,
          recentDocuments: [],
          archiveDocuments: [],
        });
      },
    }),
    {
      name: "document-store",
      storage: createJSONStorage(() => localStorage),
      // @ts-ignore
      partialize: (s) => ({
        selectedDocument: s.selectedDocument,
        recentDocuments: s.recentDocuments,
      }),
    }
  )
);
