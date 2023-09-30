"use client";

import { GoBackProps } from "./GoBack.types";
import { useRouter } from "next/navigation";
import LeftArrowSVG from "images/icons/left-arrow.svg";

const GoBack = (props: GoBackProps) => {
  const { label } = props;
  const { back } = useRouter();

  return (
    <div className="GoBack flex flex-nowrap place-items-center max-h-6 hover:cursor-pointer">
      <LeftArrowSVG onClick={() => back()} />
      <p className="ml-4 text-lg font-medium">{label}</p>
    </div>
  );
};

export default GoBack;
