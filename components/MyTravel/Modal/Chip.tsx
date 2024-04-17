import Image from "next/image";
import { ReactNode } from "react";

interface ChipProp {
  chip: string;
}

export default function Chip({ chip }: ChipProp) {
  let content: string | ReactNode = "";
  let color: string = "";
  let style: string = "";

  switch (chip) {
    case "me":
      content = "나";
      color = "bg-[#CCFBF1]";
      style =
        "text-12 text-[#0D9488] font-normal leading-[130%] tracking-[0.6px]";
      break;
    case "leader":
      content = (
        <>
          <Image
            src={"/icons/crown.svg"}
            alt="왕관 이미지"
            width={14}
            height={14}
          />
        </>
      );
      color = "bg-[#FEF9C3]";
      style = "";
      break;
    default:
      break;
  }

  return (
    <>
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full ${color} ${style}`}
      >
        {content}
      </div>
    </>
  );
}
