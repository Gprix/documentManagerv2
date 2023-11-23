"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import OutOfService from "./global/OutOfService/OutOfService";
import useAuth from "@/hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

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
      {renderAppContainers()}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <OutOfService />
    </QueryClientProvider>
  );
};

export default AppLayout;
