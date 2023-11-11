"use client";

import { WorkspaceSetupProps } from "./WorkspaceSetup.types";
import Button from "@/components/ui/Button/Button";
import GAccountDropdown from "@/components/global/GAccountDropdown/GAccountDropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Workspace } from "@/services/workspace/workspace.service.types";
import NewWorkspaceModal from "../NewWorkspaceModal/NewWorkspaceModal";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { useFetchUserWorkspaces } from "@/services/workspace/workspace.service.hooks";
import { useAuthStore } from "@/stores/auth.store";
import WorkspaceListPlaceholder from "@/components/placeholders/WorkspaceListPlaceholder";
import Divider from "@/components/global/Divider/Divider";
import Badge from "@/components/ui/Badge/Badge";
import EmptyState from "@/components/global/EmptyState/EmptyState";

const WorkspaceSetup = (props: WorkspaceSetupProps) => {
  const { push } = useRouter();
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const setSelectedWorkspace = useWorkspaceStore((s) => s.setSelectedWorkspace);
  const setWorkspaces = useWorkspaceStore((s) => s.setWorkspaces);
  const uid = useAuthStore((s) => s.uid);
  const {
    data: _workspaces,
    status,
    refetch,
  } = useFetchUserWorkspaces({
    enabled: uid !== undefined,
  });
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);

  console.log({ showNewWorkspaceModal });

  const renderWorkspaceList = () => {
    if (status === "loading") return <WorkspaceListPlaceholder />;
    if (status === "success" && workspaces?.length === 0)
      return (
        <EmptyState
          title="Aún no tienes espacios de trabajo"
          description="Crea o únete a un espacio de trabajo para empezar a usar DocuNot."
        />
      );
    // TODO: revisar pq siempre cae en este estado (Error)
    // if (status === "error")
    //   return (
    //     <p className="text-center text-error">
    //       Error al cargar los espacios de trabajo
    //     </p>
    //   );

    return (
      <section>
        {status === "success" && workspaces?.length ? (
          <div className="flex justify-between items-start">
            <div className="mb-8">
              <p className="font-medium text-xl text-txt">
                Mis espacios de trabajo
              </p>
              {workspaces.length >= 5 ? (
                <p className="text-xs text-red-500">
                  Has alcanzado el límite máximo de espacios de trabajo.
                </p>
              ) : null}
            </div>
            <Badge
              value={workspaces.length}
              maxValue={5}
              className="mt-1 !border-surf-contrast"
            />
          </div>
        ) : null}
        <ul className="flex flex-wrap flex-col md:flex-row">
          {workspaces.map((workspace) => (
            <li key={workspace.uid} className="mb-3 md:w-1/2">
              <p
                className="underline font-medium text-txt-accent inline-block hover:cursor-pointer"
                onClick={() => handleSelectWorkspace(workspace)}
              >
                {workspace.name}
              </p>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  const renderWorkspaceActions = () => {
    return (
      <div className="flex gap-x-4 justify-between flex-col md:flex-row-reverse gap-y-4">
        <Button
          className="text-sm"
          onClick={() => setShowNewWorkspaceModal(true)}
          disabled={workspaces.length >= 5}
        >
          Nuevo espacio de trabajo
        </Button>
        <Button className="text-sm" appearance="outline" disabled>
          Unirse a un espacio de trabajo
        </Button>
      </div>
    );
  };

  const handleSelectWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    push("/workspace/documents/");
  };

  useEffect(() => {
    if (!uid) return;
    if (_workspaces?.length) {
      setWorkspaces(_workspaces);
    }
  }, [_workspaces, uid]);

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center py-8">
        <GAccountDropdown />
        <div className="w-full flex flex-col flex-grow justify-center items-center">
          <div className="bg-surf rounded-lg p-8 overflow-clip w-[90%] md:w-[35rem] border border-surf-semi-contrast">
            {renderWorkspaceList()}
            <Divider className="my-6" />
            {renderWorkspaceActions()}
          </div>
        </div>
      </div>
      <NewWorkspaceModal
        isOpened={showNewWorkspaceModal}
        onClose={() => {
          setShowNewWorkspaceModal(false);
          refetch();
        }}
      />
    </>
  );
};

export default WorkspaceSetup;
