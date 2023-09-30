import { Workspace } from "@/services/workspace/workspace.service.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WorkspaceState {
  selectedWorkspace: Workspace | undefined;
  workspaces: Workspace[];
}

interface WorkspaceActions {
  setSelectedWorkspace: (workspace: Workspace) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
}

export const useWorkspaceStore = create(
  persist<WorkspaceState & WorkspaceActions>(
    (set, get) => ({
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
      storage: createJSONStorage(() => localStorage),
    }
  )
);
