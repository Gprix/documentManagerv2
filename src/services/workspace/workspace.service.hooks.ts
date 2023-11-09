import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryOptions } from "@/types/query.types";
import { WriteWorkspacePayload } from "./workspace.service.types";
import { getCurrentUserWorkspaces } from "./workspace.service";
import { getWorkspace, writeWorkspace } from "./workspace.service";

export const useFetchUserWorkspaces = (queryOptions: QueryOptions = {}) =>
  useQuery({
    queryKey: ["workspaces"],
    queryFn: () => getCurrentUserWorkspaces(),
  });

export const useFetchWorkspace = (
  uid: string,
  queryOptions: QueryOptions = {}
) =>
  useQuery({
    queryKey: ["workspace", uid],
    queryFn: () => getWorkspace(uid),
    ...queryOptions,
  });

export const useWriteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: WriteWorkspacePayload) => writeWorkspace(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      },
    }
  );
};
