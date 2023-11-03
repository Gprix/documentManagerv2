import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getCurrentUserWorkspaces, getWorkspace } from "./workspace.service";

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
