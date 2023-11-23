import { NodeRawData } from "@/types/document.types";
import { BaseNodeProps } from "../BaseNode/BaseNode.types";

export interface TextNodeRawData extends NodeRawData {
  style: TextType;
  value: string;
}

export interface TextNodeProps extends BaseNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextNodeRawData;
  /** Callback function to update node data. */
  onNodeUpdate: (node: TextNodeRawData) => void;
}

export type TextType = "h1" | "h2" | "h3" | "span" | "longText" | "p";
