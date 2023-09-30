import { NextFont } from "@/types/common.types";

export const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export const getLastFromPathname = (pathname: string) => {
  const splitted = pathname.split("/");
  return splitted[splitted.length - 1];
};

export const getFonts = (fonts: NextFont[]) => {
  return fonts
    .map((font) => {
      const { className } = font;
      return className;
    })
    .join(" ");
};

export type NullableString = string | null | undefined;

export const jn = (...args: NullableString[]) => {
  return args.join(" ").trim();
};
