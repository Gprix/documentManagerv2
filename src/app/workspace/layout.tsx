"use client";

import SideBar from "@/components/global/SideBar/SideBar";
import { useDatablocks } from "@/contexts/datablocks/datablocks.context.hooks";
import { useTemplates } from "@/contexts/templates/templates.context.hooks";
import { getDatablocksInWorkspace } from "@/services/datablocks/datablocks.service";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { getTemplatesInWorkspace } from "@/services/template/template.service";
import { Template } from "@/services/template/template.service.types";
import { getWorkspace } from "@/services/workspace/workspace.service";
import { useFetchUserWorkspaces } from "@/services/workspace/workspace.service.hooks";
import { Workspace } from "@/services/workspace/workspace.service.types";
import { useAuthStore } from "@/stores/auth.store";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo } from "react";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const uid = useAuthStore((s) => s.uid);
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const setSelectedWorkspace = useWorkspaceStore((s) => s.setSelectedWorkspace);
  const setWorkspaces = useWorkspaceStore((s) => s.setWorkspaces);
  const { data: workspaces = [] } = useFetchUserWorkspaces();
  const { setSelectedTemplates } = useTemplates();
  const { setSelectedDatablocks } = useDatablocks();
  const selectedWorkspaceFromLocalStorage = useMemo(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem("SELECTED_WORKSPACE");
    }
  }, []);

  const restoreLastWorkspace = async () => {
    if (!selectedWorkspaceFromLocalStorage) return;
    const lastWorkspace = await getWorkspace(selectedWorkspaceFromLocalStorage);
    setSelectedWorkspace(lastWorkspace as Workspace);
  };

  // Retrieve the workspaces and set them on Zustand
  useEffect(() => {
    setWorkspaces(workspaces);
  }, [workspaces]);

  useEffect(() => {
    if (selectedWorkspace) return;
    if (pathname === "/workspace") return;

    restoreLastWorkspace();
  }, [
    pathname,
    selectedWorkspace,
    selectedWorkspaceFromLocalStorage,
    setSelectedWorkspace,
  ]);

  useLayoutEffect(() => {
    if (!uid) return;
    if (!selectedWorkspace) return;

    const getDatablocks = async () => {
      const datablocks = await getDatablocksInWorkspace(selectedWorkspace.uid);
      setSelectedDatablocks(datablocks as DataBlock[]);
    };

    getDatablocks();
  }, [selectedWorkspace, setSelectedDatablocks, uid]);

  useLayoutEffect(() => {
    if (!uid) return;
    if (!selectedWorkspace) return;

    const getTemplates = async () => {
      const templates = await getTemplatesInWorkspace(selectedWorkspace.uid);
      setSelectedTemplates(templates as Template[]);
    };

    getTemplates();
  }, [selectedWorkspace, setSelectedTemplates, uid]);

  return (
    <>
      {selectedWorkspace ? <SideBar /> : null}
      {children}
    </>
  );
};

export default WorkspaceLayout;
