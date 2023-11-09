import { z } from "zod";

export const schema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  documentType: z
    .string()
    .min(2, "El tipo de documento debe tener al menos 2 caracteres"),
  documentNumber: z
    .string()
    .min(6, "El número de documento debe tener al menos 6 caracteres"),
});

export type NewMemberSchema = z.infer<typeof schema>;
