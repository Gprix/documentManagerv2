import { ButtonAppearance } from "./Button.types";

export const getContainerStyle = (type: ButtonAppearance) =>
  ({
    solid: "bg-accent rounded-2xl p-4",
    outline: "",
    transparent: "",
  }[type]);

export const getTextStyle = (type: ButtonAppearance) =>
  ({
    solid: "font-medium",
    outline: "underline font-medium",
    transparent: "",
  }[type]);
