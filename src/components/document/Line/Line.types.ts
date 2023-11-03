import { NodeRawData } from "@/types/document.types";

export interface LineProps {
  className?: string;
  data: NodeRawData[] | undefined;
  lineNumber: number;
  onNodeUpdate: (newNodeData: NodeRawData) => void;
  isEditable?: boolean;
}
