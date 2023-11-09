"use client";

import { useAuthStore } from "@/stores/auth.store";
import Button from "../ui/Button/Button";
import NewModal from "../ui/Modal/NewModal";
import { useFetchMember } from "@/services/member/member.service.hooks";

const NewMemberModal = () => {
  const uid = useAuthStore((s) => s.uid);
  const { data: member } = useFetchMember(uid ?? "", { enabled: !!uid });
  const isOpened = member === null;

  return (
    <NewModal
      isOpened={isOpened}
      showCloseButton={false}
      title="Completa tu perfil"
      className="w-full md:w-[600px]"
    >
      <div className="flex flex-col gap-y-3">
        <input
          autoFocus
          type="text"
          className="no-focus-outline text-txt placeholder-surf-contrast w-full text-sm font-light border-b border-surf-contrast bg-transparent"
          placeholder="Nombre (ej. Leeroy Jenkins)"
        />
        <input
          autoFocus
          type="text"
          className="no-focus-outline text-txt placeholder-surf-contrast w-full text-sm font-light border-b border-surf-contrast bg-transparent"
          placeholder="Tipo de documento (ej. DNI)"
        />
        <input
          autoFocus
          type="text"
          className="no-focus-outline text-txt placeholder-surf-contrast w-full text-sm font-light border-b border-surf-contrast bg-transparent"
          placeholder="Número de documento (ej. 76543210)"
        />
      </div>
      <Button className="mt-6">Guardar</Button>
      <p className="text-sm text-txt-accent mt-1">
        Parte de la información de tu perfil servirá para identificarte en los
        documentos con los que interactúes.
      </p>
    </NewModal>
  );
};

export default NewMemberModal;
