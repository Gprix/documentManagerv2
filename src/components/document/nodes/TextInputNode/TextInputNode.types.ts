import { TextInputNodeRawData } from "@/types/document.types";
import { BaseNodeProps } from "../BaseNode/BaseNode.types";

/**
 * TextInputNode component props.
 *
 * @param {string} className - Custom className.
 * @param {TextInputNodeRawData} data - Node data.
 * @param {(node: TextInputNodeRawData) => void} onNodeUpdate - Callback function to update node data.
 */
export interface TextInputNodeProps extends BaseNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextInputNodeRawData;
  /** Callback function to update node data. */
  onNodeUpdate: (node: TextInputNodeRawData) => void;
}
