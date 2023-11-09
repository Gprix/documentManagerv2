"use client";

import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import useAuth from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import { useFetchMember } from "@/services/member/member.service.hooks";
import { useAuthStore } from "@/stores/auth.store";
import { jn } from "@/utils/common.utils";
import { GAccountDropdownProps } from "./GAccountDropdown.types";
import DropdownArrowSVG from "images/icons/dropdown-arrow.svg";

const GAccountDropdown = (props: GAccountDropdownProps) => {
  const { className } = props;
  const { signInWithGoogle } = useAuth();
  const { error, success } = useNotification();
  const uid = useAuthStore((s) => s.uid);
  const { data: member } = useFetchMember(uid ?? "", { enabled: !!uid });
  const { name = "", photoURL = "" } = member ?? {};

  const handleSwitchAccounts = async () => {
    const credentials = await signInWithGoogle();
    const { user } = credentials ?? {};
    if (!user) {
      error("No se pudo iniciar sesión con Google");
      return;
    }
    success("Ha cambiado de cuenta exitosamente");
  };

  return (
    <div
      className={jn(
        "GAccountDropdown",
        "flex items-center justify-center gap-x-6 bg-surf-alt rounded-md px-6 py-4",
        className
      )}
    >
      <Image
        src={photoURL}
        alt={name}
        width="64"
        height="64"
        className="rounded-full"
      />
      <div>
        <p className="text-white text-sm">Bienvenido/a</p>
        <Button
          appearance="outline"
          textStyle="text-txt font-semibold"
          iconStyle="[&_path]:fill-txt"
          rightIcon={<DropdownArrowSVG />}
          onClick={handleSwitchAccounts}
        >
          {name.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};

export default GAccountDropdown;
