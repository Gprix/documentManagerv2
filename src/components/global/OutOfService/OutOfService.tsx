"use client";

import EmptyState from "../EmptyState/EmptyState";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AppParameters } from "../../../services/appParameters/appParameters.service.types";
import { db } from "@/config/firebase.config";

const OutOfService = () => {
  const [appParameters, setAppParameters] = useState<AppParameters>();
  const { outOfService = false } = appParameters ?? {};

  // TODO: revisar como hacerlo correctamente con hooks y react query
  const getAppParameters = async () => {
    try {
      onSnapshot(doc(db, "appParameters", "settings"), (doc) => {
        if (!doc.exists() || !doc.data()) return;
        setAppParameters(doc.data() as AppParameters);
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAppParameters();
  }, []);

  if (!outOfService) return null;

  return (
    <section className="h-screen w-screen absolute top-0 left-0 right-0 bottom-0 z-50 flex flex-col items-center justify-center bg-bck">
      <EmptyState
        title="¡Hola!"
        description="DocuNot se encuentra actualmente fuera de servicio. Por favor, inténtalo de nuevo más tarde."
      />
    </section>
  );
};

export default OutOfService;
