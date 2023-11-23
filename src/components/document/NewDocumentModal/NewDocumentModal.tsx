import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { getTitle } from "./NewDocumentModal.helpers";
import Divider from "@/components/global/Divider/Divider";
import Button from "@/components/ui/Button/Button";
import NewModal from "@/components/ui/Modal/NewModal";
import Switch from "@/components/ui/Switch/Switch";
import TextInput from "@/components/ui/TextInput";
import { useNotification } from "@/hooks/useNotification";
import usePersist from "@/hooks/usePersist";
import { useWriteDocument } from "@/services/document/document.service.hooks";
import { useWriteTemplate } from "@/services/template/template.service.hooks";
import { Template } from "@/services/template/template.service.types";
import { useWorkspaceStore } from "@/stores/workspace.store";

const activeClassName = "font-medium text-txt-accent";

export interface NewDocumentModalProps {
  isOpened: boolean;
  isTemplate?: boolean;
  fromTemplate?: Template;
}

const NewDocumentModal = (props: NewDocumentModalProps) => {
  const { isOpened, isTemplate = false, fromTemplate } = props;
  const { push } = useRouter();
  const { mutateAsync: createDocument, status: documentStatus } =
    useWriteDocument();
  const { mutateAsync: createTemplate, status: templateStatus } =
    useWriteTemplate();
  const selectedWorkspace = usePersist(
    useWorkspaceStore,
    (s) => s.selectedWorkspace
  );
  const { uid: workspaceId } = selectedWorkspace ?? {};
  const { error, success } = useNotification();
  const isLoading =
    documentStatus === "loading" || templateStatus === "loading";
  const [documentTitle, setDocumentTitle] = useState("");
  const [isProtocol, setIsProtocol] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const headerTitle = useMemo(() => {
    const documentType = isTemplate ? "Plantilla" : "Acta";
    return `Nueva ${documentType}`;
  }, [isTemplate]);

  const renderNoTemplateMessage = () => {
    return (
      <>
        {isTemplate ? (
          <p className="mt-4 opacity-50 text-xs text-center">
            Estás creando una plantilla{" "}
            <span className="font-medium">en blanco</span>.{" "}
            <span className="underline hover:cursor-pointer">
              ¿Extender de otra plantilla?
            </span>
          </p>
        ) : (
          <p className="mt-4 opacity-50 text-xs text-center">
            Estás creando un acta <span className="font-medium">en blanco</span>
            .{" "}
            <span className="underline hover:cursor-pointer">
              ¿Deseas usar una plantilla?
            </span>
          </p>
        )}
      </>
    );
  };

  const successMessage = useCallback(
    (templateName?: string) => {
      const documentType = isTemplate ? "Plantilla" : "Acta";
      const documentTemplate = templateName ? ` basada en ${templateName}` : "";

      return `${documentType}${documentTemplate} creada correctamente`;
    },
    [isTemplate]
  );

  const errorMessage = useCallback(
    (templateName?: string) => {
      const documentType = isTemplate ? "la plantilla" : "el acta";
      const documentTemplate = templateName ? ` basada en ${templateName}` : "";

      return `No se pudo crear ${documentType}${documentTemplate}`;
    },
    [isTemplate]
  );

  const submitHandler = async () => {
    if (!workspaceId) return;
    if (!documentTitle || !documentTitle.length) return;

    const documentProtocol = isProtocol ? "protocol" : "extra";

    let newId;

    if (fromTemplate) {
      await createNewFromTemplate(fromTemplate);
      return;
    }

    if (isTemplate) {
      newId = await createTemplate({
        name: documentTitle,
        workspaceId,
        documentProtocol,
        templateData: [],
        enabled,
      });
    } else {
      newId = await createDocument({
        title: documentTitle,
        workspaceId,
        documentProtocol,
        documentData: [],
      });
    }

    if (!newId) error(errorMessage());
    if (!newId) return;

    success(successMessage());
    push(`/workspace/workshop/${newId}`);
  };

  const createNewFromTemplate = async (template: Template) => {
    if (!template) return;
    if (!workspaceId) return;

    const { name: templateName, templateData, documentProtocol } = template;

    let newId;

    if (isTemplate) {
      newId = await createTemplate({
        name: documentTitle,
        workspaceId,
        templateData,
        documentProtocol,
        enabled,
      });
    } else {
      newId = await createDocument({
        title: documentTitle,
        workspaceId,
        documentProtocol,
        documentData: templateData,
      });
    }

    if (!newId) error(errorMessage(templateName));
    if (!newId) return;

    success(successMessage(templateName));
    push(`/workspace/workshop/${newId}?isTemplate=true`);
  };

  return (
    <NewModal
      title={headerTitle}
      isOpened={isOpened}
      className="w-full md:w-[25rem]"
    >
      <TextInput
        onChange={(e) => setDocumentTitle(e.target.value)}
        value={documentTitle}
        autoFocus
        type="text"
        placeholder={getTitle(isTemplate)}
      />
      <div className="flex gap-x-3 justify-between items-center px-6 py-4">
        <p className={!isProtocol ? activeClassName : ""}>Extra protocolar</p>
        <Switch
          checked={isProtocol}
          onChange={() => setIsProtocol((p) => !p)}
        />
        <p className={isProtocol ? activeClassName : ""}>Protocolar</p>
      </div>
      {isTemplate ? (
        <div className="flex gap-x-3 justify-between items-center px-6 py-4">
          <p className={!enabled ? activeClassName : ""}>Deshabilitada</p>
          <Switch checked={enabled} onChange={() => setEnabled((p) => !p)} />
          <p className={enabled ? activeClassName : ""}>Habilitada</p>
        </div>
      ) : null}
      <Divider />
      {!fromTemplate ? renderNoTemplateMessage() : null}
      <Button
        className="mt-2"
        isLoading={isLoading}
        disabled={!documentTitle || !documentTitle.length}
        onClick={submitHandler}
      >
        Crear nueva {isTemplate ? "plantilla" : "acta"}
      </Button>
    </NewModal>
  );
};

export default NewDocumentModal;
