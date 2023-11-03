"use client";

import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { GAccountDropdownProps } from "./GAccountDropdown.types";
import DropdownArrowSVG from "images/icons/dropdown-arrow.svg";
import { getMember } from "@/services/member/member.service";
import { useEffect, useState } from "react";
import { Member } from "@/services/member/member.service.types";
import { useAuthStore } from "@/stores/auth.store";
import useAuth from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import { jn } from "@/utils/common.utils";

const GAccountDropdown = (props: GAccountDropdownProps) => {
  const { className = "" } = props;
  const { error } = useNotification();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { signInWithGoogle } = useAuth();
  const uid = useAuthStore((s) => s.uid);

  const handleSwitchAccounts = async () => {
    const credentials = await signInWithGoogle();
    const { user } = credentials ?? {};
    if (!user) {
      error("No se pudo iniciar sesión con Google");
      return;
    }
  };

  useEffect(() => {
    if (!uid) return;

    const retrieveUserInfo = async () => {
      const member = await getMember(uid ?? "");
      const { name, photoURL } = (member as Member) ?? {};

      setName(name);
      setPhotoURL(photoURL);
    };

    retrieveUserInfo();
  }, [uid]);

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
          type="outline"
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
