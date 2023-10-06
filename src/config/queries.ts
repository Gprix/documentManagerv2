import { createQueryKeys } from "@lukemorales/query-key-factory";
import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { getWorkspace } from "@/services/workspace/workspace.service";
import { getCurrentUserWorkspaces } from "@/services/workspace/workspace.service";
import {
  getDocument,
  getDocumentsInWorkspace,
} from "@/services/document/document.service";

export const workspaceKeys = createQueryKeys("workspaces", {
  workspace: (uid: string) => ({
    queryKey: ["workspace", { uid }],
    queryFn: () => getWorkspace(uid),
  }),
  userWorkspaces: () => ({
    queryKey: ["userWorkspaces"],
    queryFn: () => getCurrentUserWorkspaces(),
  }),
});

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

export const queries = mergeQueryKeys(workspaceKeys, documentKeys);
