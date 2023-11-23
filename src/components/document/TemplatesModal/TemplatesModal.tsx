"use client";

import { useState } from "react";

import { TemplatesModalProps } from "./TemplatesModal.types";
import { DocumentActions } from "../DocumentActions/DocumentActions";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { SearchBar } from "@/components/global/SearchBar/SearchBar";
import Button from "@/components/ui/Button/Button";
import { Modal } from "@/components/ui/Modal/Modal";
import { useFetchWorkspaceTemplates } from "@/services/template/template.service.hooks";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { getPreviewNodesUtility } from "@/utils/document.utils";

export const TemplatesModal = (props: TemplatesModalProps) => {
  const { className = "", onClose } = props;
  const { selectedWorkspace } = useWorkspaceStore();
  const { uid: workspaceId = "" } = selectedWorkspace ?? {};
  const { data: templates } = useFetchWorkspaceTemplates(workspaceId, {
    enabled: !!workspaceId,
  });
  const [filters, setFilters] = useState({
    protocol: true,
    extra: true,
    untagged: true,
  });
  const buttonInactiveStyle = "bg-transparent hover:bg-primaryLight";
  const buttonInactiveTextStyle = "!text-primary";

  return (
    <Modal
      onClose={onClose}
      className={`TemplatesModal centered-relative pb-6 w-[90%] ${className}`}
    >
      <h2 className="ml-6 font-medium text-xl mt-8 mb-6">Plantillas</h2>
      <DocumentActions
        templateList={templates ?? []}
        withNewAction
        newActionLabel="Nueva plantilla"
        isTemplate
      />

      <SearchBar />

      <div className="Filters mx-6 flex gap-x-2 my-4">
        <Button
          className={`py-2 border-2 border-primary ${
            filters.protocol ? "" : buttonInactiveStyle
          }`}
          textStyle={`text-sm ${
            filters.protocol ? "" : buttonInactiveTextStyle
          }`}
          onClick={() =>
            setFilters((prev) => ({ ...prev, protocol: !prev.protocol }))
          }
        >
          Protocolares
        </Button>
        <Button
          className={`py-2 border-2 border-primary ${
            filters.extra ? "" : buttonInactiveStyle
          }`}
          textStyle={`text-sm ${filters.extra ? "" : buttonInactiveTextStyle}`}
          onClick={() =>
            setFilters((prev) => ({ ...prev, extra: !prev.extra }))
          }
        >
          Extra protocolares
        </Button>
        <Button
          className={`py-2 border-2 border-primary ${
            filters.untagged ? "" : buttonInactiveStyle
          }`}
          textStyle={`text-sm ${
            filters.untagged ? "" : buttonInactiveTextStyle
          }`}
          onClick={() => {
            setFilters((prev) => ({ ...prev, untagged: !prev.untagged }));
          }}
        >
          Sin etiquetar
        </Button>
      </div>

      <ul className="w-full flex-wrap flex gap-8 px-6">
        {templates?.map((template) => {
          const {
            uid,
            documentProtocol: documentType,
            name,
            templateData,
          } = template;

          const previewNodes = getPreviewNodesUtility(templateData);

          return (
            <DocumentPreview
              documentId={uid}
              key={uid}
              previewNodes={previewNodes}
              documentProtocol={documentType}
              documentName={name}
              isTemplate
            />
          );
        })}
      </ul>
    </Modal>
  );
};
