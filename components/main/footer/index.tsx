import Image from "next/image";

export default function Footer() {
  return (
    <div className="max-w-1200 flex h-100 w-full items-center justify-center gap-16 self-stretch bg-stone-200 mobile:gap-12">
      <div className="relative h-20 w-32 mobile:h-15 mobile:w-24">
        <Image src={"/icons/symbol.svg"} alt="푸터로고" fill sizes="32px" />
      </div>
      <div className="text-12 font-normal text-neutral-400">
        Copyright 2024. 길동무 All rights reserved.
      </div>
    </div>
  );
}
