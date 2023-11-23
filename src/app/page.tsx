"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Divider from "@/components/global/Divider/Divider";
import Button from "@/components/ui/Button/Button";
import CONSTANTS from "@/config/constants";
import useAuth from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import { useAuthStore } from "@/stores/auth.store";
import { jn } from "@/utils/common.utils";
import GoogleSVG from "images/auth/google.svg";
import LogoSVG from "images/logo.svg";
import WavesSVG from "images/waves.svg";

const HomePage = () => {
  const { push } = useRouter();
  const { signInWithGoogle } = useAuth();
  const uid = useAuthStore((s) => s.uid);
  const { error, success } = useNotification();

  const handleSignIn = async () => {
    const credentials = await signInWithGoogle();
    const { user } = credentials ?? {};
    if (!user) {
      error("No se pudo iniciar sesión con Google");
      return;
    }
    success("Sesión iniciada exitosamente");
    push("/workspace");
  };

  useEffect(() => {
    if (!uid) return;
    push("/workspace");
  }, [push, uid]);

  if (uid) return null;

  return (
    <section
      className={jn(
        "bg-gradient-to-bl from-bck/80 to-surf",
        "absolute flex w-full left-0 right-0 bottom-0 justify-center items-center",
        "w-full h-full min-h-screen min-w-screen"
      )}
    >
      <div className="z-10 p-16 flex flex-col justify-center">
        <div className="bg-surf-alt/30 backdrop-blur rounded-lg border-surf-semi-contrast border p-12">
          <p className="text-txt opacity-50 text-sm">
            v{CONSTANTS.PROJECT.VERSION}
          </p>
          <LogoSVG />
          <Divider className="w-[10%] !h-1.5 mt-1 mb-8 !bg-accent" />
          <div className="text-txt pb-8 flex-col flex gap-y-4 md:gap-y-2">
            <p>Accede a tus actas de forma rápida y segura.</p>
            <p>
              Olvídate de los archivadores y agiliza tus trámites notariales.
            </p>
            <p>
              Simplifica tu trabajo con DocuNot®, el gestor documental de
              procesos notariales.
            </p>
          </div>
          <Button
            className="mt-6 w-full"
            leftIcon={<GoogleSVG />}
            iconStyle="mr-2"
            onClick={handleSignIn}
          >
            Continuar con Google
          </Button>
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 w-full pointer-events-none">
        <WavesSVG />
      </div>
    </section>
  );
};

export default HomePage;
