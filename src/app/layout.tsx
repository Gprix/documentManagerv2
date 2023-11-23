import { Metadata } from "next";
import CONSTANTS from "@/config/constants";
import { initFonts } from "@/config/fonts.config";
import AppLayout from "../components/AppLayout";
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
        <AppLayout>
          <main className="h-screen max-h-screen overflow-hidden flex relative">
            {children}
          </main>
        </AppLayout>
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
