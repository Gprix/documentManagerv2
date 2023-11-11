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
import { useRouter } from "next/navigation";
import { useDocumentStore } from "@/stores/document.store";
import { useWorkspaceStore } from "@/stores/workspace.store";

const GAccountDropdown = (props: GAccountDropdownProps) => {
  const { className } = props;
  const { signInWithGoogle, signOut } = useAuth();
  const { error, success } = useNotification();
  const { push, refresh } = useRouter();
  const uid = useAuthStore((s) => s.uid);
  const resetAuth = useAuthStore((s) => s.reset);
  const resetDocuments = useDocumentStore((s) => s.reset);
  const resetWorkspace = useWorkspaceStore((s) => s.reset);
  const { data: member } = useFetchMember(uid ?? "", { enabled: !!uid });
  const { name = "", photoURL = "" } = member ?? {};

  const reset = () => {
    resetAuth();
    resetDocuments();
    resetWorkspace();
  };

  const handleSwitchAccounts = async () => {
    const credentials = await signInWithGoogle();
    const { user } = credentials ?? {};
    if (!user) {
      error("No se pudo iniciar sesión con Google");
      return;
    }
    success("Ha cambiado de cuenta exitosamente");
  };

  const handleSignOut = async () => {
    await signOut();
    reset();
    push("/");
    refresh();
  };

  return (
    <>
      <div
        className={jn(
          "GAccountDropdown",
          "flex items-center justify-center gap-x-6 bg-surf-alt rounded-md px-6 py-4 animate-slide-to-bottom",
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
      <Button
        onClick={handleSignOut}
        className="mt-2 text-sm opacity-80"
        appearance="outline"
      >
        Cerrar sesión
      </Button>
    </>
  );
};

export default GAccountDropdown;
