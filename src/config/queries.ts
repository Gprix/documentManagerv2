import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { workspaceKeys } from "@/services/workspace/workspace.service.query";
import { documentKeys } from "@/services/document/document.service.query";

export const queries = mergeQueryKeys(workspaceKeys, documentKeys);
