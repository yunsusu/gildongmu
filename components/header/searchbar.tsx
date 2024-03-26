import Image from "next/image";

import { Input } from "@/components/ui/input";

export default function Searchbar() {
  const placeholderStyle =
    "placeholder:text-18 placeholder:font-bold placeholder:leading-tight placeholder:tracking-tight placeholder:tablet:text-16";

  return (
    <div className="relative">
      <Input
        className={`bg-bg-01 flex h-60 w-[564px] rounded-[32px] pb-12 pl-24 pr-12 pt-12 text-xl font-bold leading-tight tracking-tight text-text-02 focus-visible:ring-0 focus-visible:ring-offset-0 tablet:h-52 tablet:w-[534px] tablet:text-16 mobile:w-312 ${placeholderStyle}`}
        placeholder="가고 싶은 여행지를 검색해 주세요!"
      />
      <button className="absolute right-20 top-1/2 -translate-y-1/2">
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
