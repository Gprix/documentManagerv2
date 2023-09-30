import { Workspace } from "@/services/workspace/workspace.service.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WorkspaceState {
  selectedWorkspace: Workspace | undefined;
  workspaces: Workspace[];
}

interface WorkspaceActions {
  setSelectedWorkspace: (workspace: Workspace) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
}

export const useWorkspaceStore = create<WorkspaceState & WorkspaceActions>()(
  devtools(
    persist(
      (set) => ({
        selectedWorkspace: undefined,
        workspaces: [],
        setSelectedWorkspace: (workspace: Workspace) => {
          set({ selectedWorkspace: workspace });
        },
        setWorkspaces: (workspaces: Workspace[]) => {
          set({ workspaces });
        },
      }),
      {
        name: "workspace-store",
      }
    )
  )
);
