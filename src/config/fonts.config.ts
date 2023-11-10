import localFont from "next/font/local";

const document = localFont({
  src: "../../public/fonts/Besley-Regular.ttf",
  variable: "--font-document",
});
const regular = localFont({
  src: "../../public/fonts/Ubuntu-Regular.ttf",
  variable: "--font-regular",
});

const medium = localFont({
  src: "../../public/fonts/Ubuntu-Medium.ttf",
  variable: "--font-medium",
});

const bold = localFont({
  src: "../../public/fonts/Ubuntu-Bold.ttf",
  variable: "--font-bold",
});

export const initFonts = () => {
  return `${regular.variable} ${medium.variable} ${bold.variable} ${document.variable}`;
};
