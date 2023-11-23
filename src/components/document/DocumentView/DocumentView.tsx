"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { DocumentViewProps } from "./DocumentView.types";
import { DataCaptureModal } from "../DataCaptureModal/DataCaptureModal";
import { Paper } from "../Paper/Paper";
// import { DocumentToolbox } from "../DocumentToolbox/DocumentToolbox";
import EditableText from "@/components/global/EditableText/EditableText";
import { EditableTextRef } from "@/components/global/EditableText/EditableText.types";
import GoBack from "@/components/global/GoBack/GoBack";
import Button from "@/components/ui/Button/Button";
import { Modal } from "@/components/ui/Modal/Modal";
import { useNotification } from "@/hooks/useNotification";
import { updateDocument } from "@/services/document/document.service";
import { getDocument } from "@/services/document/document.service";
import { useFetchWorkspaceDocuments } from "@/services/document/document.service.hooks";
import { updateTemplate } from "@/services/template/template.service";
import { getTemplate } from "@/services/template/template.service";
import { WriteTemplatePayload } from "@/services/template/template.service.types";
import { useDocumentStore } from "@/stores/document.store";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { Document, DocumentProtocol } from "@/types/document.types";
import { jn } from "@/utils/common.utils";
import { exportDocument, importDocument } from "@/utils/document.utils";
import RightArrowWhiteSVG from "images/icons/right-arrow-white.svg";

export const DocumentView = (props: DocumentViewProps) => {
  const { className, documentId, isTemplate } = props;
  const { id: documentIdParams } = useParams();
  const selectedWorkspace = useWorkspaceStore((s) => s.selectedWorkspace);
  const { uid: workspaceId = "" } = selectedWorkspace ?? {};
  const { data: documents } = useFetchWorkspaceDocuments(workspaceId, {
    enabled: !!workspaceId,
  });
  const setSelectedDocument = useDocumentStore((s) => s.setSelectedDocument);
  const selectedDocument = useDocumentStore((s) => s.selectedDocument);
  const setSelectedDocumentType = useDocumentStore(
    (s) => s.setSelectedDocumentType
  );
  const _selectedDocument = documents?.find(
    (doc) => doc.uid === documentIdParams
  );
  setSelectedDocument(_selectedDocument);

  const { success, error } = useNotification();

  const addRecentDocument = useDocumentStore((s) => s.addRecentDocument);
  const { title, uid, documentProtocol: documentType } = selectedDocument ?? {};
  const [showDataCaptureModal, setShowDataCaptureModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localType, setLocalType] = useState<DocumentProtocol>();

  const enhancedTitle = useMemo(() => {
    if (!title) return "";
    return title.trim();
  }, [title]);

  const titleRef = useRef<EditableTextRef>(null);

  const handleToggleMode = async () => {
    if (!selectedDocument) return;

    if (isEditing && isTemplate) {
      const currentTemplateId: string = selectedDocument.uid;

      const currentTemplate: WriteTemplatePayload = {
        workspaceId: selectedDocument.workspaceId,
        documentProtocol: selectedDocument.documentProtocol,
        templateData: selectedDocument.documentData,
        name: selectedDocument.title,
        // TODO: manage enabled state better
        enabled: true,
      };

      await updateTemplate(currentTemplateId, currentTemplate);
      success("Plantilla actualizada correctamente");
    }

    if (isEditing && !isTemplate) {
      await updateDocument(selectedDocument.uid, {
        ...selectedDocument,
        title: titleRef?.current?.getTitle() ?? title ?? "",
      });
      success("Acta actualizada correctamente");
    }

    setIsEditing((prev) => !prev);
  };

  const handleImport = async (file: File | undefined) => {
    if (!file) {
      error("No se pudo importar el documento");
      return;
    }
    const isCompressed = file.name.endsWith(".dcn");

    try {
      const imported = await importDocument(file, isCompressed);
      if (!imported) {
        error("No se pudo importar el documento");
        return;
      }
      const documentPayload: Document = {
        ...imported,
        workspaceId: selectedDocument?.workspaceId ?? "",
        uid: selectedDocument?.uid ?? "",
        authorId: selectedDocument?.authorId ?? "",
      };

      setSelectedDocument(documentPayload);
      success("Documento importado correctamente!");
      await handleToggleMode();
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublish = async () => {};

  const handleChangeProtocol = async () => {
    if (!isEditing) return;
    setLocalType((p) => (p === "protocol" ? "extra" : "protocol"));
  };

  const renderDocumentType = () => {
    if (!localType) return null;
    return (
      <p
        className={jn("text-sm", isEditing ? "hover:cursor-pointer" : "")}
        onClick={handleChangeProtocol}
      >
        <span className="text-txt opacity-80 pr-2">
          {isTemplate ? "Plantilla" : "Acta"}
        </span>
        🞄
        <span
          className={jn(
            localType === "protocol" ? "bg-accent" : "bg-secondary",
            "ml-2 px-2 rounded-full text-txt"
          )}
        >
          {localType === "protocol" ? "Protocolar" : "Extra protocolar"}
        </span>
      </p>
    );
  };

  useEffect(() => {
    if (!documentType) return;

    setLocalType(documentType);
  }, [documentType]);

  // update document type
  useEffect(() => {
    if (!localType) return;
    setSelectedDocumentType(localType);
  }, [localType, setSelectedDocumentType]);

  // Add open document to recent documents list
  useEffect(() => {
    if (isTemplate) return;
    if (!uid) return;
    addRecentDocument(uid);
  }, [addRecentDocument, isTemplate, uid]);

  // Retrieve document
  useEffect(() => {
    const retrieveDocument = async () => {
      const retrievedDocument = isTemplate
        ? await getTemplate(documentId)
        : await getDocument(documentId);

      if (!retrievedDocument) return;

      if (isTemplate) {
        const rawDoc: Document = {
          uid: retrievedDocument.uid,
          authorId: retrievedDocument.authorId,
          workspaceId: retrievedDocument.workspaceId,
          documentProtocol: retrievedDocument.documentProtocol,
          // TODO: revisar
          //@ts-ignore
          title: retrievedDocument.name,
          //@ts-ignore
          documentData: retrievedDocument.templateData,
        };
        setSelectedDocument(rawDoc as Document);
        return;
      }

      setSelectedDocument(retrievedDocument as Document);
    };
    retrieveDocument();

    return () => {
      setSelectedDocument(undefined);
    };
  }, [documentId, isTemplate, setSelectedDocument]);

  useEffect(() => {
    if (!selectedDocument) return;
  }, [selectedDocument]);

  return (
    <>
      <section className={`DocumentView relative ${className}`}>
        {/* Top toolbar */}
        <div className="bg-surf-semi-contrast border-surf-contrast border-b">
          <div className="DocumentView__controls flex justify-between px-4 pt-6 pb-4 shadow-md">
            <div className="DocumentView__controls--left flex w-full">
              <GoBack />
              <div className="DocumentView__info">
                {enhancedTitle ? (
                  <EditableText
                    ref={titleRef}
                    text={enhancedTitle}
                    className="text-xl mb-2"
                    inputClassName={jn(
                      "force-full-width !max-w-[71vw] z-10 no-focus-outline",
                      "text-txt placeholder-surf-contrast w-full text-sm font-light border-b border-surf-contrast bg-transparent"
                    )}
                    additionalAction={() => setIsEditing(true)}
                  />
                ) : (
                  <p className="text-xl">{title}</p>
                )}
                {renderDocumentType()}
              </div>
            </div>
            <div className="flex items-center  mr-4 ">
              <Link
                href="/workspace/publishdocs"
                className="text-[#FF4D84] underline"
              >
                Ver estado
              </Link>
            </div>
            <div className="flex items-center  mr-4 ">
              <button
                onClick={handlePublish}
                className="text-[#FF4D84] underline"
              >
                Publicar
              </button>
            </div>
            <Button
              onClick={handleToggleMode}
              className="DocumentView__button"
              rightIcon={<RightArrowWhiteSVG />}
            >
              {isEditing ? "Guardar" : "Editar"}
            </Button>
          </div>
        </div>

        {/* {isEditing ? <DocumentToolbox /> : null} */}
        {isEditing ? (
          <div className="flex gap-x-4 bg-surf-contrast px-8 text-sm text-txt py-1">
            <Button
              appearance="transparent"
              onClick={() => setShowImportModal(true)}
            >
              Importar
            </Button>
            <Button
              appearance="transparent"
              onClick={() => {
                if (!selectedDocument) return;
                exportDocument(selectedDocument);
              }}
            >
              Exportar
            </Button>
          </div>
        ) : null}

        <div
          className={`overflow-y-auto h-screen max-h-screen ${
            isEditing ? "bg-bck" : ""
          }`}
        >
          <Paper
            isEditing={isEditing}
            document={{ ...selectedDocument } as Document}
            className={jn(
              "text-txt mb-64 transition-md",
              "mx-auto max-w-[1024px]",
              isEditing
                ? "bg-surf-semi-contrast/30 rounded-xl mt-8 mb-64 shadow-md"
                : "bg-transparent rounded-none"
            )}
          />
        </div>

        <div className="absolute right-0 top-0"></div>

        <div className="absolute right-0 bottom-0 pt-4 pl-4"></div>
      </section>
      {showImportModal ? (
        <Modal
          className="p-6 centered-relative"
          onClose={() => setShowImportModal(false)}
        >
          <p className="text-xl ">Importar documento</p>
          <p className="text-sm text-dimmed mb-3">
            Seleccionar archivo .json o .dcn
          </p>
          <input
            type="file"
            onChange={(e) => handleImport(e.target.files?.[0])}
          />
        </Modal>
      ) : null}
      {showDataCaptureModal ? (
        <DataCaptureModal
          onClose={() => setShowDataCaptureModal(!showDataCaptureModal)}
        />
      ) : null}
    </>
  );
};
