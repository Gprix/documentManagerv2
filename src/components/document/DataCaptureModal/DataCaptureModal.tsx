"use client";

import { DataCaptureModalProps } from "./DataCaptureModal.types";
import { Modal } from "../../ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import { useMemo } from "react";
import { InputNodeRawData } from "@/types/document.types";
import { LinkedNodePreview } from "../LinkedNodePreview/LinkedNodePreview";
import { useDocumentStore } from "@/stores/document.store";

// TODO: finish implementing this component
export const DataCaptureModal = (props: DataCaptureModalProps) => {
  const { className = "", onClose } = props;
  const selectedDocument = useDocumentStore((s) => s.selectedDocument);
  const { documentData } = selectedDocument ?? {};

  const linkedNodes = useMemo(() => {
    if (!documentData) return [];

    return documentData.filter((node) => {
      const { type, linkedTo } = node as InputNodeRawData;

      return (
        (type === "textInput" || type === "numberInput") && linkedTo !== null
      );
    });
  }, [documentData]);

  return (
    <Modal
      className={`DataCaptureModal centered-relative px-12 w-[40vw] ${className}`}
      onClose={onClose}
    >
      <h2 className="font-medium text-xl mt-8 mb-6">
        Asistente de captura de datos
      </h2>

      <div className="LinkedNodesList bg-secondaryLight rounded-lg p-4">
        {!linkedNodes.length ? (
          <p className="text-dimmed font-medium text-center hover:cursor-default">
            No se han encontrado nodos vinculados
          </p>
        ) : null}
        {linkedNodes.map((node, i) => {
          const { linkedTo } = node as InputNodeRawData;

          if (linkedTo === null) return null;

          return <LinkedNodePreview key={i} linkedTo={linkedTo} />;
        })}
      </div>
      <p className="text-right text-sm mt-1.5">12 vínculos</p>

      <div className="DataOrigin text-center bg-secondaryLight rounded-lg p-4 mt-6 mb-4">
        <p className="text-dimmed font-medium hover:cursor-default">
          Se ha seleccionado un origen
        </p>
        <p className="font-mono text-xs text-dimmed">data_source.csv</p>
      </div>
      {/* <p>mensajes de error</p> */}

      <div className="flex justify-between my-6">
        <Button className="" appearance="outline">
          Seleccionar origen...
        </Button>
        <Button disabled className="w-5/12">
          Capturar datos
        </Button>
      </div>
    </Modal>
  );
};
