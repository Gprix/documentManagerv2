import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getDocument, writeDocument } from "./document.service";
import { getDocumentsInWorkspace } from "./document.service";
import { WriteDocumentPayload } from "./document.services.types";
import { QueryOptions } from "@/types/query.types";

export const useFetchDocument = (
  uid: string,
  queryOptions: QueryOptions = {}
) => {
  return useQuery({
    queryKey: ["document", uid],
    queryFn: () => getDocument(uid),
    ...queryOptions,
  });
};

export const useFetchWorkspaceDocuments = (
  workspaceId: string,
  queryOptions: QueryOptions = {}
) => {
  return useQuery({
    queryKey: ["workspaceDocuments", workspaceId],
    queryFn: () => getDocumentsInWorkspace(workspaceId),
    ...queryOptions,
  });
};

export const useWriteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WriteDocumentPayload) => writeDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceDocuments"] });
    },
  });
};
