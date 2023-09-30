"use client";

import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CONSTANTS } from "@/config/constants";
import { DocumentProvider } from "@/contexts/document/document.context";
import { DatablocksProvider } from "@/contexts/datablocks/datablocks.context";
import { TemplatesProvider } from "@/contexts/templates/templates.context";
import useAuth from "@/hooks/useAuth";

const DevelopmentStatusProvider = () => {
  const { STATUS } = CONSTANTS.PROJECT;
  const stripesStyle = {
    background: [
      "repeating-linear-gradient(",
      "45deg,#2F0F0F,#2F0F0F 10px,",
      "#D69F1F 10px,#D69F1F 20px)",
    ].join(""),
  };

  if (STATUS === "DEVELOPMENT") {
    return (
      <div
        style={stripesStyle}
        className="flex items-center justify-center py-2"
      >
        <p className="text-white font-mono font-bold underline">
          Development Build
        </p>
      </div>
    );
  }

  return null;
};

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { listenAuthState } = useAuth();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 15,
      },
    },
  });

  useEffect(() => {
    return listenAuthState();
  }, [listenAuthState]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DevelopmentStatusProvider />
        <TemplatesProvider>
          <DatablocksProvider>
            <DocumentProvider>{children}</DocumentProvider>
          </DatablocksProvider>
        </TemplatesProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default AppProviders;
