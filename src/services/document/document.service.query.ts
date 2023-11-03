import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getDocument, getDocumentsInWorkspace } from "./document.service";

export const documentKeys = createQueryKeys("documents", {
  document: (uid: string) => ({
    queryKey: ["document", { uid }],
    queryFn: () => getDocument(uid),
  }),
  documentsInWorkspace: (workspaceId: string) => ({
    queryKey: ["documentsInWorkspace", { workspaceId }],
    queryFn: () => getDocumentsInWorkspace(workspaceId),
  }),
});
