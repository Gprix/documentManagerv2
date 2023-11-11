"use client";

import NewMemberModal from "@/components/NewMemberModal/NewMemberModal";
import SideBar from "@/components/global/SideBar/SideBar";
import { useDatablocks } from "@/contexts/datablocks/datablocks.context.hooks";
import { useTemplates } from "@/contexts/templates/templates.context.hooks";
import usePersist from "@/hooks/usePersist";
import { getDatablocksInWorkspace } from "@/services/datablocks/datablocks.service";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { getTemplatesInWorkspace } from "@/services/template/template.service";
import { Template } from "@/services/template/template.service.types";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { useCallback, useEffect } from "react";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  const selectedWorkspace = usePersist(
    useWorkspaceStore,
    (s) => s.selectedWorkspace
  );
  const { setSelectedTemplates } = useTemplates();
  const { setSelectedDatablocks } = useDatablocks();

  const getTemplates = useCallback(async () => {
    if (!selectedWorkspace) return;
    const templates = await getTemplatesInWorkspace(selectedWorkspace.uid);
    setSelectedTemplates(templates as Template[]);
  }, [selectedWorkspace, setSelectedTemplates]);

  const getDatablocks = useCallback(async () => {
    if (!selectedWorkspace) return;
    const datablocks = await getDatablocksInWorkspace(selectedWorkspace.uid);
    setSelectedDatablocks(datablocks as DataBlock[]);
  }, [selectedWorkspace, setSelectedDatablocks]);

  useEffect(() => {
    getTemplates();
    getDatablocks();
  }, [getDatablocks, getTemplates]);

  return (
    <>
      <SideBar />
      {children}
      <NewMemberModal />
    </>
  );
};

export default WorkspaceLayout;
