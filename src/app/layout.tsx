"use client";

import "@/styles/globals.css";
import { Pathway_Extreme } from "next/font/google";
import AppProviders from "../components/AppProviders";
import { ToastContainer } from "react-toastify";
import { getFonts } from "@/utils/common.utils";
import "react-toastify/dist/ReactToastify.css";

const pathway_extreme = Pathway_Extreme({
  subsets: ["latin"],
  display: "swap",
});

const fonts = getFonts([pathway_extreme]);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fonts} mx-auto`}>
        <AppProviders>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            draggable={false}
            theme="colored"
          />
          <main className="h-screen max-h-screen overflow-hidden flex relative">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
