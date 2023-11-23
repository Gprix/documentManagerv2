"use client";

import { useState } from "react";

import { TemplatesModalProps } from "./TemplatesModal.types";
import { DocumentActions } from "../DocumentActions/DocumentActions";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import Button from "@/components/ui/Button/Button";
import NewModal from "@/components/ui/Modal/NewModal";
import TextInput from "@/components/ui/TextInput";
import { useFetchWorkspaceTemplates } from "@/services/template/template.service.hooks";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { jn } from "@/utils/common.utils";
import { getPreviewNodesUtility } from "@/utils/document.utils";

const buttonInactiveStyle = "bg-transparent";

export const TemplatesModal = (props: TemplatesModalProps) => {
  const { className, onClose, isOpened } = props;
  const { selectedWorkspace } = useWorkspaceStore();
  const { uid: workspaceId = "" } = selectedWorkspace ?? {};
  const { data: templates } = useFetchWorkspaceTemplates(workspaceId, {
    enabled: !!workspaceId,
  });
  const [filters, setFilters] = useState({
    protocol: true,
    extra: true,
  });
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setSearch("");
    onClose?.();
  };

  return (
    <NewModal
      title="Plantillas"
      isOpened={isOpened}
      onClose={handleClose}
      className={`TemplatesModal px-0 pb-6 w-[90%] ${className}`}
      closeButtonClassName="pr-2"
    >
      <DocumentActions
        templateList={templates ?? []}
        withNewAction
        newActionLabel="Nueva plantilla"
        isTemplate
      />
      <div className="px-8 pt-6 pb-2">
        <TextInput
          placeholder="Buscar plantilla... "
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="Filters mx-6 flex gap-x-2 my-4">
        <Button
          className={jn(
            "py-2 border border-surf-semi-contrast",
            !filters.protocol ? buttonInactiveStyle : ""
          )}
          onClick={() =>
            setFilters((prev) => ({ ...prev, protocol: !prev.protocol }))
          }
        >
          Protocolares
        </Button>
        <Button
          className={jn(
            "py-2 border border-surf-semi-contrast",
            !filters.extra ? buttonInactiveStyle : ""
          )}
          onClick={() =>
            setFilters((prev) => ({ ...prev, extra: !prev.extra }))
          }
        >
          Extra protocolares
        </Button>
      </div>

      <ul className="w-full flex-wrap flex gap-8 px-6">
        {templates?.map((template) => {
          const { uid, documentProtocol, name, templateData } = template;

          if (search && search.length) {
            const isMatch = name.toLowerCase().includes(search.toLowerCase());
            if (!isMatch) return null;
          }

          if (!filters.protocol && documentProtocol === "protocol") return null;
          if (!filters.extra && documentProtocol === "extra") return null;

          const previewNodes = getPreviewNodesUtility(templateData);

          return (
            <DocumentPreview
              documentId={uid}
              key={uid}
              previewNodes={previewNodes}
              documentProtocol={documentProtocol}
              documentName={name}
              isTemplate
            />
          );
        })}
      </ul>
    </NewModal>
  );
};
