import { useState } from "react";

import { DocumentActionsProps } from "./DocumentActions.types";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import NewDocumentModal from "../NewDocumentModal/NewDocumentModal";
import { Template } from "@/services/template/template.service.types";
import { jn } from "@/utils/common.utils";
import { getPreviewNodesUtility } from "@/utils/document.utils";

export const DocumentActions = (props: DocumentActionsProps) => {
  const { className } = props;
  const { withNewAction = false, newActionLabel } = props;
  const { templateList, isTemplate = false } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [template, setTemplate] = useState<Template>();

  const newAction = () => {
    setIsOpened(true);
    setTemplate(undefined);
  };

  const templateAction = (template: Template) => {
    setIsOpened(true);
    setTemplate(template);
  };

  return (
    <>
      <div
        className={jn("DocumentActions", "bg-surf-alt pt-2 pb-4", className)}
      >
        <div
          className={jn(
            "flex gap-x-8 px-6 overflow-x-auto",
            isTemplate ? "pt-2" : "pt-14"
          )}
        >
          {withNewAction ? (
            <div onClick={() => newAction()}>
              <div
                className={jn(
                  "border border-transparent hover:border-dimmed bg-white",
                  "relative w-[15rem] h-[10rem] hover:cursor-pointer rounded-t-xl transition-md"
                )}
              >
                <p className="centered-relative text-4xl font-bold select-none">
                  +
                </p>
              </div>
              <p className="hover:cursor-text text-sm mt-1 font-mono">
                {newActionLabel}
              </p>
            </div>
          ) : null}
          {templateList?.map((template) => {
            const { uid, documentProtocol, name, templateData } = template;
            const previewNodes = getPreviewNodesUtility(templateData);

            return (
              <DocumentPreview
                documentId={uid}
                key={uid}
                previewNodes={previewNodes}
                documentProtocol={documentProtocol}
                documentName={name}
                action={() => templateAction(template)}
              />
            );
          })}
        </div>
      </div>
      <NewDocumentModal
        isOpened={isOpened}
        isTemplate={isTemplate}
        fromTemplate={template}
      />
    </>
  );
};
