"use client";

import { AuthProvider } from "@/contexts/auth/auth.context";
import { DocumentProvider } from "@/contexts/document/document.context";
import { DatablocksProvider } from "../contexts/datablocks/datablocks.context";
import { TemplatesProvider } from "../contexts/templates/templates.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TemplatesProvider>
            <DatablocksProvider>
              <DocumentProvider>{children}</DocumentProvider>
            </DatablocksProvider>
          </TemplatesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default AppProviders;
