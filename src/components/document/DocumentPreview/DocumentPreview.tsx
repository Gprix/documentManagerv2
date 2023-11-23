"use client";
import { useRouter } from "next/navigation";

import { nodesDataToTextHelper } from "./DocumentPreview.helpers";
import { DocumentPreviewProps } from "./DocumentPreview.types";
import usePersist from "@/hooks/usePersist";
import { useDataBlocksStore } from "@/stores/datablocks.store";

export const DocumentPreview = (props: DocumentPreviewProps) => {
  const { className = "" } = props;
  const { documentProtocol, documentName, documentId } = props;
  const { previewNodes, action, isTemplate } = props;
  const isProtocol = documentProtocol === "protocol";
  const { push } = useRouter();
  const dataBlocks = usePersist(useDataBlocksStore, (s) => s.dataBlocks);
  const to = `/workspace/workshop/${documentId}${
    isTemplate ? "?isTemplate=true" : ""
  }`;

  const defaultAction = action ?? (() => push(to));

  return (
    <div>
      <div
        onClick={() => defaultAction()}
        className={`DocumentPreview bg-surf-semi-contrast border border-transparent group relative w-[15rem] h-[10rem] hover:cursor-pointer hover:border ${
          isProtocol ? "hover:border-accent" : "hover:border-secondary"
        } transition-md rounded-t-xl ${className}`}
      >
        <p className="max-h-[10rem] py-2 pl-2 text-txt opacity-80 text-sm pr-6 pb-10 overflow-y-scroll">
          {nodesDataToTextHelper(previewNodes, dataBlocks ?? [])}
        </p>
        <p
          className={`group-hover:w-full group-hover:rounded-none w-8 rounded-l-xl overflow-clip absolute bottom-0 right-0 px-3 pt-2 pb-1 ${
            isProtocol ? "bg-accent" : "bg-secondary"
          } text-surf-bg-surf-semi-contrast font-semibold text-sm transition-md`}
        >
          {isProtocol ? "Protocolar" : "Extra"}
        </p>
      </div>
      <p className="max-w-[240px] text-ellipsis line-clamp-2 text-sm mt-1 font-mono underline">
        {documentName}
      </p>
    </div>
  );
};
