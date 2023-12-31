"use client";

import { Modal } from "@/components/ui/Modal/Modal";
import { NewBlockModalProps } from "./TextBlockNode.types";
import Button from "@/components/ui/Button/Button";
import { ChangeEvent, useState } from "react";
import { getDatablocksInWorkspace } from "@/services/datablocks/datablocks.service";
import { writeDatablock } from "@/services/datablocks/datablocks.service";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { useNotification } from "@/hooks/useNotification";
import { useDataBlocksStore } from "@/stores/datablocks.store";

const NewBlockModal = (props: NewBlockModalProps) => {
  const { onClose } = props;
  const { error, success } = useNotification();
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const setDataBlocks = useDataBlocksStore((s) => s.setDataBlocks);
  const [blockName, setBlockName] = useState<string>();

  const handleNewBlock = async () => {
    if (!blockName?.length) return;
    if (!selectedWorkspace) return;

    const block = await writeDatablock({
      value: blockName,
      workspaceId: selectedWorkspace.uid,
    });

    if (!block) {
      error("No se pudo crear el bloque de datos");
      return;
    }

    success(`Bloque de datos '${blockName}' creado exitosamente`);

    const _datablocks = await getDatablocksInWorkspace(selectedWorkspace.uid);
    setDataBlocks(_datablocks as DataBlock[]);
    onClose();
  };

  return (
    <Modal
      className="centered-relative w-[60%] p-6 shadow max-w-[600px]"
      onClose={() => onClose()}
    >
      <p className="text-lg mb-6">Nuevo bloque de datos</p>
      <input
        autoFocus
        type="text"
        className="no-focus-outline text-black w-full text-sm font-light border-b border-black"
        placeholder="Ingrese el bloque de datos"
        value={blockName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setBlockName(e.target.value)
        }
      />
      <p className="text-xs mt-1 font-light text-primary">
        *: Soporta la nomenclatura de rutas{" "}
        <span className="bg-primaryLight px-2 text-primaryDark rounded-lg">
          ruta/hacia/bloque
        </span>
        .
      </p>
      <Button
        onClick={() => handleNewBlock()}
        disabled={!blockName?.length}
        className="w-full mt-8"
      >
        Guardar bloque de datos
      </Button>
    </Modal>
  );
};

export default NewBlockModal;
