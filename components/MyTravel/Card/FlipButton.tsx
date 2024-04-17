import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface FilpButtonProp {
  type: string;
  isFlipped: boolean;
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
}

export default function FilpButton({
  type,
  isFlipped,
  setIsFlipped,
}: FilpButtonProp) {
  return (
    <>
      {type === "front" && (
        <div
          className="absolute bottom-18 right-18 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full bg-white p-2 tablet:bottom-14 tablet:right-16 mobile:bottom-8 mobile:right-10"
          onClick={e => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
        >
          <Image
            src={"/icons/arrow-left-right.svg"}
            alt="뒤집기 아이콘"
            width={18}
            height={18}
          />
        </div>
      )}
      {type === "back" && (
        <div
          className="absolute bottom-18 right-18 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full bg-[#A5B4FC] p-2 tablet:bottom-14 tablet:right-16 mobile:bottom-8 mobile:right-10"
          onClick={e => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
        >
          <Image
            src={"/icons/arrow-white-left-right.svg"}
            alt="뒤집기 아이콘"
            width={18}
            height={18}
          />
        </div>
      )}
    </>
  );
}
