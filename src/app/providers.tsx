"use client";

import { DocumentProvider } from "@/contexts/document/document.context";
import { DatablocksProvider } from "../contexts/datablocks/datablocks.context";
import { TemplatesProvider } from "../contexts/templates/templates.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { listenAuthState } = useAuth();
  const queryClient = new QueryClient();

  useEffect(() => {
    return listenAuthState();
  }, [listenAuthState]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TemplatesProvider>
          <DatablocksProvider>
            <DocumentProvider>{children}</DocumentProvider>
          </DatablocksProvider>
        </TemplatesProvider>
      </QueryClientProvider>
    </>
  );
};

export default AppProviders;
