import { ButtonType } from "./Button.types";

export const getContainerStyle = (type: ButtonType) =>
  ({
    solid: "bg-accent rounded-2xl p-4",
    outline: "",
    transparent: "",
  }[type]);

export const getTextStyle = (type: ButtonType) =>
  ({
    solid: "text-txt font-semibold",
    outline: "text-txt underline font-medium",
    transparent: "text-txt",
  }[type]);
