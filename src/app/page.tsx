"use client";

// import DocsSVG from "images/docs.svg";
// import WavesSVG from "images/waves.svg";
import LogoSVG from "images/logo.svg";
import GoogleSVG from "images/auth/google.svg";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Poppins } from "next/font/google";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { useNotification } from "@/hooks/useNotification";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

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
  }, [uid]);

  if (uid) return null;

  return (
    <section
      className={[
        "bg-gradient-to-tr from-black to-secondary",
        "absolute flex w-full left-0 right-0 bottom-0",
        "w-full h-full min-h-screen min-w-screen font-",
      ].join(" ")}
    >
      {/* <div className="absolute left-0 right-0 bottom-0 w-full pointer-events-none">
        <WavesSVG />
      </div> */}
      <div className="relative flex max-w-[1440px] mx-auto">
        {/* <div className="w-1/2 z-10 flex flex-col justify-center items-center p-16">
          <DocsSVG className="scale-75" />
        </div> */}
        <div className="z-10 p-16 flex flex-col justify-center">
          <LogoSVG />
          <ul className={`${poppins.className} text-white pb-8`}>
            <li className="Home__list-item">
              Accede a tus actas de forma rápida y segura.
            </li>
            <li className="Home__list-item">
              Olvídate de los archivadores y agiliza tus trámites notariales.
            </li>
            <li className="Home__list-item">
              Simplifica tu trabajo con DocuNot®, el gestor documental de
              procesos notariales.
            </li>
          </ul>
          <div className="flex flex-row-reverse">
            <div className="flex flex-col justify-center gap-y-3">
              <Button
                leftIcon={<GoogleSVG />}
                iconStyle="mr-2"
                onClick={handleSignIn}
              >
                Continuar con Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
