"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { NewMemberSchema, schema } from "./NewMemberModal.helpers";
import Button from "../ui/Button/Button";
import NewModal from "../ui/Modal/NewModal";
import TextInput from "../ui/TextInput";
import { useFetchMember } from "@/services/member/member.service.hooks";
import { useWriteMember } from "@/services/member/member.service.hooks";
import { useAuthStore } from "@/stores/auth.store";

const NewMemberModal = () => {
  const { register, handleSubmit, formState } = useForm<NewMemberSchema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const uid = useAuthStore((s) => s.uid);
  const { data: member } = useFetchMember(uid ?? "", { enabled: !!uid });
  const { mutateAsync: createMember } = useWriteMember();
  const isOpened = member === null;
  const isSubmitting = formState.isSubmitting;
  const client = useQueryClient();

  const submitHandler = async (values: NewMemberSchema) => {
    await createMember({ uid, ...values });
    client.invalidateQueries(["member", uid]);
  };

  if (member) return null;

  return (
    <NewModal
      isOpened={isOpened}
      showCloseButton={false}
      title="Completa tu perfil"
      className="w-full md:w-[600px]"
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col gap-y-3">
          <TextInput
            {...register("name")}
            autoFocus
            type="text"
            placeholder="Nombre (ej. Leeroy Jenkins)"
            errorMessage={formState.errors.name?.message}
          />
          <TextInput
            {...register("documentType")}
            type="text"
            placeholder="Tipo de documento (ej. DNI)"
            errorMessage={formState.errors.documentType?.message}
          />
          <TextInput
            {...register("documentNumber")}
            type="text"
            placeholder="Número de documento (ej. 76543210)"
            errorMessage={formState.errors.documentNumber?.message}
          />
        </div>
        <Button
          htmlType="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mt-6 w-full"
        >
          Guardar
        </Button>
        <p className="text-sm text-txt-accent mt-1">
          Parte de la información de tu perfil servirá para identificarte en los
          documentos con los que interactúes.
        </p>
      </form>
    </NewModal>
  );
};

export default NewMemberModal;
