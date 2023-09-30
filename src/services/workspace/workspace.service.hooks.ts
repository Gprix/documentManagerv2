import { useQuery } from "@tanstack/react-query";
import { queries } from "@/config/queries";
import { QueryOptions } from "@/types/query.types";

export const useFetchUserWorkspaces = (queryOptions: QueryOptions = {}) =>
  useQuery({ ...queries.workspaces.userWorkspaces(), ...queryOptions });

export const useFetchWorkspace = (
  uid: string,
  queryOptions: QueryOptions = {}
) => useQuery({ ...queries.workspaces.workspace(uid), ...queryOptions });
