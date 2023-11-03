"use client";

import Button from "@/components/ui/Button/Button";
import { Modal } from "@/components/ui/Modal/Modal";
import { ChangeEvent, useState } from "react";
import { NewWorkspaceModalProps } from "./WorkspaceSetup/WorkspaceSetup.types";
import { writeWorkspace } from "@/services/workspace/workspace.service";
import { useNotification } from "@/hooks/useNotification";

const NewWorkspaceModal = (props: NewWorkspaceModalProps) => {
  const { onClose } = props;
  const { error, success } = useNotification();
  const [workspaceName, setWorkspaceName] = useState<string>();
  const [workspaceMembers, setWorkspaceMembers] = useState<string>();

  const handleCreateWorkspace = async () => {
    if (!workspaceName || !workspaceName.length) return;

    const newWorkspace = await writeWorkspace({
      name: workspaceName,
      members: workspaceMembers?.trim().split(" "),
    });

    if (!newWorkspace) {
      error("No se pudo crear el espacio de trabajo");
      return;
    }

    success("Espacio de trabajo creado exitosamente");
    onClose();
  };

  return (
    <Modal
      className="centered-relative w-[60%] p-6 shadow max-w-[600px]"
      onClose={() => onClose()}
    >
      <p className="text-lg mb-6">Nuevo espacio de trabajo</p>
      <input
        autoFocus
        type="text"
        className="no-focus-outline text-black w-full text-sm font-light border-b border-black"
        placeholder="Ingrese el nombre del espacio de trabajo"
        value={workspaceName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setWorkspaceName(e.target.value)
        }
      />
      <p className="text-sm mt-6 mb-2">¿Es un espacio colaborativo?</p>
      <input
        type="text"
        className="text-xs font-light border-primary border border-dashed rounded-md no-focus-outline w-full pb-8 pl-2 pt-2 pr-2"
        placeholder="Agregue el UID de los miembros de su equipo separados por un espacio"
        value={workspaceMembers}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setWorkspaceMembers(e.target.value)
        }
      />
      <p className="text-primary text-xs mt-1 text-right">
        Detectados: {workspaceMembers?.trim().split(" ").length ?? 0} uid(s)
      </p>
      <Button
        onClick={() => handleCreateWorkspace()}
        disabled={!workspaceName?.length}
        className="w-full mt-8"
      >
        Crear nuevo espacio de trabajo
      </Button>
    </Modal>
  );
};

export default NewWorkspaceModal;
