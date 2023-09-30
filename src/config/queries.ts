import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

import { getWorkspace } from "@/services/workspace/workspace.service";
import { getCurrentUserWorkspaces } from "@/services/workspace/workspace.service";

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

export const queries = mergeQueryKeys(workspaceKeys);
