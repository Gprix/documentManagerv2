import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Workspace } from "@/services/workspace/workspace.service.types";

interface WorkspaceState {
  selectedWorkspace: Workspace | undefined;
}

interface WorkspaceActions {
  setSelectedWorkspace: (workspace: Workspace) => void;
  reset: () => void;
}

export const useWorkspaceStore = create(
  persist<WorkspaceState & WorkspaceActions>(
    (set) => ({
      selectedWorkspace: undefined,
      setSelectedWorkspace: (workspace: Workspace) => {
        set({ selectedWorkspace: workspace });
      },
      reset: () => {
        set({
          selectedWorkspace: undefined,
        });
      },
    }),
    {
      name: "workspace-store",
      storage: createJSONStorage(() => localStorage),
      // @ts-ignore
      partialize: (s) => ({ selectedWorkspace: s.selectedWorkspace }),
    }
  )
);
