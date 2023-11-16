"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import OutOfService from "./global/OutOfService/OutOfService";
import CONSTANTS from "@/config/constants";
import useAuth from "@/hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

const { STATUS, VERSION } = CONSTANTS.PROJECT;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { listenAuthState } = useAuth();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 15,
      },
    },
  });

  const renderAppContainers = () => {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          draggable={false}
          theme="colored"
        />
      </>
    );
  };

  const renderAppStatus = () => {
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
          <p className="text-white font-mono font-bold underline bg-black/40 px-4 py-1 rounded-lg">
            Development Build v{VERSION}
          </p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    return listenAuthState();
  }, [listenAuthState]);

  // prevent access to any page if user is not logged in
  // useEffect(() => {
  //   if (uid) return;
  //   if (pathname === "/") return;
  //   // assign current pathname to a "from" params
  //   const params = new URLSearchParams();
  //   params.set("from", pathname);
  //   push(`/${params}`);
  // }, [pathname, push, uid]);

  return (
    <QueryClientProvider client={queryClient}>
      {renderAppStatus()}
      {renderAppContainers()}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <OutOfService />
    </QueryClientProvider>
  );
};

export default AppLayout;
