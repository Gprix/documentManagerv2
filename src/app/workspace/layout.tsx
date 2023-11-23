"use client";

import { useCallback, useEffect } from "react";

import NewMemberModal from "@/components/NewMemberModal/NewMemberModal";
import SideBar from "@/components/global/SideBar/SideBar";
import usePersist from "@/hooks/usePersist";
import { getDatablocksInWorkspace } from "@/services/datablocks/datablocks.service";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { useDataBlocksStore } from "@/stores/datablocks.store";
import { useWorkspaceStore } from "@/stores/workspace.store";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  const selectedWorkspace = usePersist(
    useWorkspaceStore,
    (s) => s.selectedWorkspace
  );
  const setDataBlocks = useDataBlocksStore((s) => s.setDataBlocks);

  const getDatablocks = useCallback(async () => {
    if (!selectedWorkspace) return;
    const datablocks = await getDatablocksInWorkspace(selectedWorkspace.uid);
    setDataBlocks(datablocks as DataBlock[]);
  }, [selectedWorkspace, setDataBlocks]);

  useEffect(() => {
    getDatablocks();
  }, [getDatablocks]);

  return (
    <>
      <SideBar />
      {children}
      <NewMemberModal />
    </>
  );
};

export default WorkspaceLayout;
