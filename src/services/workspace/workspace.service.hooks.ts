import { useMutation, useQuery } from "@tanstack/react-query";
import { queries } from "@/config/queries";
import { QueryOptions } from "@/types/query.types";
import { WriteWorkspacePayload } from "./workspace.service.types";
import { writeWorkspace } from "./workspace.service";

export const useFetchUserWorkspaces = (queryOptions: QueryOptions = {}) =>
  useQuery({ ...queries.workspaces.userWorkspaces(), ...queryOptions });

export const useFetchWorkspace = (
  uid: string,
  queryOptions: QueryOptions = {}
) => useQuery({ ...queries.workspaces.workspace(uid), ...queryOptions });

export const useWriteWorkspace = () =>
  useMutation((payload: WriteWorkspacePayload) => writeWorkspace(payload));
