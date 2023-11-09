import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/query.types";
import { getDocument, getDocumentsInWorkspace } from "./document.service";

export const useFetchDocument = (
  uid: string,
  queryOptions: QueryOptions = {}
) =>
  useQuery({
    queryKey: ["document", uid],
    queryFn: () => getDocument(uid),
    ...queryOptions,
  });

export const useFetchWorkspaceDocuments = (
  workspaceId: string,
  queryOptions: QueryOptions = {}
) =>
  useQuery({
    queryKey: ["workspaceDocuments", workspaceId],
    queryFn: () => getDocumentsInWorkspace(workspaceId),
    ...queryOptions,
  });
