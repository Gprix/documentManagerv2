import { useMutation, useQuery } from "@tanstack/react-query";
import { WriteMemberPayload } from "./member.service.types";
import { getMember, writeMember } from "./member.service";
import { QueryOptions } from "@/types/query.types";

export const useFetchMember = (uid: string, queryOptions: QueryOptions = {}) =>
  useQuery({
    queryKey: ["member", uid],
    queryFn: () => getMember(uid),
    ...queryOptions,
  });

export const useWriteMember = () =>
  useMutation((payload: WriteMemberPayload) => writeMember(payload));
