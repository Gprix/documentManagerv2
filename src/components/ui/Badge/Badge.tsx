import React from "react";
import { BadgeProps } from "./Badge.types";
import { jn } from "@/utils/common.utils";

const Badge = (props: BadgeProps) => {
  const { className, value } = props;
  const { maxValue = -1 } = props;

  const renderMax = () => {
    if (maxValue === -1) return null;
    return <span>{`/${maxValue}`}</span>;
  };

  return (
    <div
      className={jn(
        "Badge",
        "text-txt border-txt border px-2 rounded-full text-sm",
        className
      )}
    >
      {value}
      {renderMax()}
    </div>
  );
};

export default Badge;
