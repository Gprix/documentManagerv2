"use client";

import { useCallback, useEffect } from "react";

import NewMemberModal from "@/components/NewMemberModal/NewMemberModal";
import SideBar from "@/components/global/SideBar/SideBar";
import usePersist from "@/hooks/usePersist";
import { getDatablocksInWorkspace } from "@/services/datablocks/datablocks.service";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { getTemplatesInWorkspace } from "@/services/template/template.service";
import { Template } from "@/services/template/template.service.types";
import { useDataBlocksStore } from "@/stores/datablocks.store";
import { useTemplateStore } from "@/stores/template.store";
import { useWorkspaceStore } from "@/stores/workspace.store";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  const selectedWorkspace = usePersist(
    useWorkspaceStore,
    (s) => s.selectedWorkspace
  );
  const setTemplates = useTemplateStore((s) => s.setTemplates);
  const setDataBlocks = useDataBlocksStore((s) => s.setDataBlocks);

  const getTemplates = useCallback(async () => {
    if (!selectedWorkspace) return;
    const templates = await getTemplatesInWorkspace(selectedWorkspace.uid);
    setTemplates(templates as Template[]);
  }, [selectedWorkspace, setTemplates]);

  const getDatablocks = useCallback(async () => {
    if (!selectedWorkspace) return;
    const datablocks = await getDatablocksInWorkspace(selectedWorkspace.uid);
    setDataBlocks(datablocks as DataBlock[]);
  }, [selectedWorkspace, setDataBlocks]);

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
