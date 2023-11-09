import { Member } from "@/types/common.types";

export interface WriteMemberPayload
  extends Omit<Member, "documentNumber" | "documentType" | "role"> {}
