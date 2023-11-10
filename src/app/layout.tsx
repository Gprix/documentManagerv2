import { Metadata } from "next";
import CONSTANTS from "@/config/constants";
import { initFonts } from "@/config/fonts.config";
import AppProviders from "../components/AppProviders";
import "@/styles/globals.css";

const { NAME } = CONSTANTS.PROJECT;
const fonts = initFonts();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fonts} mx-auto`}>
        <AppProviders>
          <main className="h-screen max-h-screen overflow-hidden flex relative">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${NAME}`,
    default: `${NAME}`,
  },
  description: "...",
};
