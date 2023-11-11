import { TextType } from "@/components/document/nodes/TextNode/TextNode.types";

export interface Document {
  uid: string;
  title: string;
  authorId: string;
  workspaceId: string;
  documentData: DocumentNodeRawData[];
  documentType: DocumentType;
}

export type DocumentType = "protocol" | "extra";

export type NodeType = "text" | "textInput" | "numberInput" | "textBlock";

export type DocumentNodeRawData =
  | TextBlockNodeRawData
  | TextInputNodeRawData
  | NumberInputNodeRawData
  | TextNodeRawData
  | NodeRawData;

export type InputNodeRawData = TextInputNodeRawData | NumberInputNodeRawData;

export interface NodeRawData {
  lineNumber: number;
  nodeNumber: number;
  isFullLine: boolean;
  type: NodeType;
}

export interface TextBlockNodeRawData extends NodeRawData {
  blockEntryId: string | null;
}

export interface TextInputNodeRawData extends NodeRawData {
  linkedTo: string | null;
  value: string;
}

export interface NumberInputNodeRawData extends NodeRawData {
  linkedTo: string | null;
  value: number;
}

export interface TextNodeRawData extends NodeRawData {
  style: TextType;
  value: string;
}

export interface DocumentExportData
  extends Omit<Document, "uid" | "authorId" | "workspaceId"> {}
