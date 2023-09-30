"use client";

import { WorkspaceSetupProps } from "./WorkspaceSetup.types";
import PatternIMG from "images/auth/pattern.png";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import GAccountDropdown from "@/components/global/GAccountDropdown/GAccountDropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Workspace } from "@/services/workspace/workspace.service.types";
import NewWorkspaceModal from "./NewWorkspaceModal";
import { useWorkspaceStore } from "@/stores/workspace.store";

const WorkspaceSetup = (props: WorkspaceSetupProps) => {
  const { push } = useRouter();
  const setSelectedWorkspace = useWorkspaceStore((s) => s.setSelectedWorkspace);
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);

  const handleSelectWorkspace = (workspace: Workspace) => {
    const { uid } = workspace;
    setSelectedWorkspace(workspace);
    localStorage.setItem("SELECTED_WORKSPACE", uid);
    push("/workspace/documents/");
  };

  const renderWorkspaceList = () => {
    return (
      <section className="px-12">
        {workspaces.length ? (
          <p className="text-black font-medium text-xl mt-8 mb-6">
            Mis espacios de trabajo
          </p>
        ) : null}
        <ul className="columns-2">
          {workspaces.map((workspace) => (
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

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center z-10">
        <GAccountDropdown className="pb-6 mx-auto" />
        <div className="bg-white rounded-lg shadow-md pb-6 overflow-clip w-[566px]">
          <Image src={PatternIMG} alt="" className="" />
          {workspaces ? renderWorkspaceList() : null}
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
      {showNewWorkspaceModal ? (
        <NewWorkspaceModal onClose={() => setShowNewWorkspaceModal(false)} />
      ) : null}
    </>
  );
};

export default WorkspaceSetup;
