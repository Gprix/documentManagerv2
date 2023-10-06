import { useQuery } from "@tanstack/react-query";
import { queries } from "@/config/queries";
import { QueryOptions } from "@/types/query.types";

export const useFetchDocument = (
  documentId: string,
  queryOptions: QueryOptions = {}
) => useQuery({ ...queries.documents.document(documentId), ...queryOptions });

export const useFetchDocumentsInWorkspace = (
  workspaceId: string,
  queryOptions: QueryOptions = {}
) =>
  useQuery({
    ...queries.documents.documentsInWorkspace(workspaceId),
    ...queryOptions,
  });
