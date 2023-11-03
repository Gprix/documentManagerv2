import { Document } from "@/types/document.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DocumentState {
  selectedDocument: Document | undefined;
  recentDocuments: Document[];
  archiveDocuments: Document[];
}

interface DocumentActions {
  setSelectedDocument: (document: Document | undefined) => void;
  setRecentDocuments: (documents: Document[]) => void;
  setArchiveDocuments: (documents: Document[]) => void;
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
      setRecentDocuments: (documents: Document[]) => {
        set({ recentDocuments: documents });
      },
      setArchiveDocuments: (documents: Document[]) => {
        set({ archiveDocuments: documents });
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
