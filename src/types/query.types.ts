import { UseQueryOptions } from "@tanstack/react-query";

export interface QueryOptions
  extends Pick<UseQueryOptions, "keepPreviousData" | "enabled"> {}
