import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getTemplatesInWorkspace, writeTemplate } from "./template.service";
import { WriteTemplatePayload } from "./template.service.types";
import { QueryOptions } from "@/types/query.types";

export const useFetchTemplate = (
  uid: string,
  queryOptions: QueryOptions = {}
) => {
  return useQuery({
    queryKey: ["template", uid],
    queryFn: () => getTemplatesInWorkspace(uid),
    ...queryOptions,
  });
};

export const useFetchWorkspaceTemplates = (
  workspaceId: string,
  queryOptions: QueryOptions = {}
) => {
  return useQuery({
    queryKey: ["workspaceTemplates"],
    queryFn: () => getTemplatesInWorkspace(workspaceId),
    ...queryOptions,
  });
};

export const useWriteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WriteTemplatePayload) => writeTemplate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceTemplates"] });
    },
  });
};
