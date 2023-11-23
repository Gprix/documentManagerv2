import { DocumentProtocol, NodeRawData } from "@/types/document.types";

/**
 * DocumentPreview component props.
 *
 * @param {string} className - Custom className.
 * @param {DocumentRawData} previewNodes - Document preview nodes.
 * @param {DocumentProtocol} previewType - Type of document.
 * @param {string} documentName - Name of document.
 * @param {string} documentId - Document id.
 * @param {string} isTemplate - Is document template.
 * @param {() => void} action - Function to execute when the document is clicked.
 */
export interface DocumentPreviewProps {
  /** Custom className. */
  className?: string;
  /** Document preview nodes. */
  previewNodes: NodeRawData[];
  /** Type of document. */
  documentProtocol: DocumentProtocol;
  /** Name of document. */
  documentName: string;
  /** Document id. */
  documentId: string;
  /** Is document template. */
  isTemplate?: boolean;
  /** Function to execute when the document is clicked. */
  action?: () => void;
}

export type DocumentPreview = string[];
