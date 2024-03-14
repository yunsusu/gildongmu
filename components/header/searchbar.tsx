import Image from "next/image";

import { Input } from "@/components/ui/input";

export default function Searchbar() {
  const placeholderStyle =
    "placeholder:text-18 placeholder:font-bold placeholder:leading-tight placeholder:tracking-tight";

  return (
    <div className="relative">
      <Input
        className={`flex w-[564px] tablet:w-[564px] mobile:w-312 h-60 tablet:h-52 pt-12 pb-12 pl-24 pr-12 rounded-[32px] bg-bg-01 tracking-tight leading-tight font-bold text-text-02 text-xl focus-visible:ring-0 focus-visible:ring-offset-0 tablet:text-16 ${placeholderStyle}`}
        placeholder="가고 싶은 여행지를 검색해 주세요!"
      />
      <button className="absolute top-1/2 -translate-y-1/2 right-20">
        <Image
          src={"/icons/search.svg"}
          alt="돋보기 아이콘"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
