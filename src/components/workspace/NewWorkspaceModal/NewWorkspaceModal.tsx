"use client";

import { ChangeEvent, useState } from "react";

import { countUIDs } from "./NewWorkspaceModal.helpers";
import { NewWorkspaceModalProps } from "../WorkspaceSetup/WorkspaceSetup.types";
import Button from "@/components/ui/Button/Button";
import NewModal from "@/components/ui/Modal/NewModal";
import { useNotification } from "@/hooks/useNotification";
import { useWriteWorkspace } from "@/services/workspace/workspace.service.hooks";
import { jn } from "@/utils/common.utils";

const NewWorkspaceModal = (props: NewWorkspaceModalProps) => {
  const { isOpened, onClose } = props;
  const { error, success } = useNotification();
  const { mutateAsync: createWorkspace, status } = useWriteWorkspace();
  const isLoading = status === "loading";
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceMembers, setWorkspaceMembers] = useState("");

  const handleOnClose = () => {
    setWorkspaceName("");
    setWorkspaceMembers("");
    onClose();
  };

  const handleCreateWorkspace = async () => {
    if (!workspaceName || !workspaceName.length) return;

    const newWorkspace = await createWorkspace({
      name: workspaceName,
      members: workspaceMembers.trim().split(" "),
    });

    if (!newWorkspace) {
      error("No se pudo crear el espacio de trabajo");
      return;
    }

    success("Espacio de trabajo creado exitosamente");
    handleOnClose();
  };

  return (
    <NewModal
      isOpened={isOpened}
      onClose={handleOnClose}
      title="Nuevo espacio de trabajo"
    >
      <input
        autoFocus
        type="text"
        className="no-focus-outline text-txt placeholder-surf-contrast w-full text-sm font-light border-b border-surf-contrast bg-transparent"
        placeholder="Ingrese el nombre del espacio de trabajo"
        value={workspaceName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setWorkspaceName(e.target.value)
        }
      />
      <p className="text-sm mt-6 mb-1 text-txt font-medium">
        ¿Es un espacio colaborativo?
      </p>
      <p className="text-xs text-txt/60 mb-2">
        Agregue el UID de los miembros de su equipo separados por un espacio
      </p>
      <input
        type="text"
        className={jn(
          "border-txt-accent border border-dashed",
          "bg-accent/30 rounded-md no-focus-outline w-full pb-8 pl-2 pt-2 pr-2",
          "text-xs font-light text-txt"
        )}
        placeholder="uF6J7DBqbY9VaUmr5CdnAf  MbBYztyw65A8XPVKk3gvpE..."
        value={workspaceMembers}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setWorkspaceMembers(e.target.value)
        }
      />
      <p className="text-txt-accent text-xs mt-1 text-right">
        Detectados: {countUIDs(workspaceMembers)} uid(s)
      </p>
      <Button
        onClick={handleCreateWorkspace}
        disabled={!workspaceName?.length || isLoading}
        className="w-full mt-8"
        isLoading={isLoading}
      >
        Crear nuevo espacio de trabajo
      </Button>
    </NewModal>
  );
};

export default NewWorkspaceModal;
