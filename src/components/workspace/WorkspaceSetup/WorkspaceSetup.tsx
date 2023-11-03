"use client";

import { WorkspaceSetupProps } from "./WorkspaceSetup.types";
import PatternIMG from "images/auth/pattern.png";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import GAccountDropdown from "@/components/global/GAccountDropdown/GAccountDropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Workspace } from "@/services/workspace/workspace.service.types";
import NewWorkspaceModal from "../NewWorkspaceModal";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { useFetchUserWorkspaces } from "@/services/workspace/workspace.service.hooks";
import { useAuthStore } from "@/stores/auth.store";
import WorkspaceListPlaceholder from "@/components/placeholders/WorkspaceListPlaceholder";

const WorkspaceSetup = (props: WorkspaceSetupProps) => {
  const { push } = useRouter();
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const setSelectedWorkspace = useWorkspaceStore((s) => s.setSelectedWorkspace);
  const setWorkspaces = useWorkspaceStore((s) => s.setWorkspaces);
  const uid = useAuthStore((s) => s.uid);
  const { data: _workspaces = [], status } = useFetchUserWorkspaces({
    enabled: !!uid,
  });
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);

  const handleSelectWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    push("/workspace/documents/");
  };

  const renderWorkspaceList = () => {
    if (status === "loading") return <WorkspaceListPlaceholder />;
    if (status === "error")
      return (
        <p className="text-center text-error">
          Error al cargar los espacios de trabajo
        </p>
      );

    return (
      <section className="px-12">
        {workspaces?.length ? (
          <p className="font-medium text-xl my-8 text-txt">
            Mis espacios de trabajo
          </p>
        ) : null}
        <ul className="columns-2">
          {workspaces?.map((workspace) => (
            <li
              key={workspace.uid}
              className="underline font-medium text-primary mb-3 hover:cursor-pointer"
              onClick={() => handleSelectWorkspace(workspace)}
            >
              {workspace.name}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  useEffect(() => {
    if (_workspaces?.length) {
      setWorkspaces(_workspaces);
    }
  }, [_workspaces]);

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center py-8">
        <GAccountDropdown />
        <div className="w-full flex flex-col flex-grow justify-center items-center">
          <div className="bg-surf rounded-lg shadow-md pb-6 overflow-clip w-[90%]">
            {/* <Image src={PatternIMG} alt="" className="" /> */}
            {renderWorkspaceList()}
            <Button
              className="mx-auto mt-6"
              onClick={() => setShowNewWorkspaceModal(true)}
            >
              Crear un espacio de trabajo
            </Button>
            <Button type="outline" className="mx-auto mt-5">
              Unirse a un espacio de trabajo
            </Button>
          </div>
        </div>
      </div>
      {showNewWorkspaceModal ? (
        <NewWorkspaceModal onClose={() => setShowNewWorkspaceModal(false)} />
      ) : null}
    </>
  );
};

export default WorkspaceSetup;
