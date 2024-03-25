import Image from "next/image";

import TravelCarousel from "@/components/carousel/travel";

export default function Travel() {
  return (
    <div className="flex flex-col bg-bg-06">
      <div className="mobile:max-w-360 m-auto flex w-full max-w-[1200px] flex-col gap-40 self-stretch px-24 py-60 tablet:max-w-[768px] tablet:py-40">
        <div className="flex justify-start gap-12">
          <Image
            src={"/icons/flag.svg"}
            alt="깃발 아이콘"
            width={40}
            height={40}
          />
          <span className="text-center text-32 font-extrabold leading-10 tracking-tight text-text-01 tablet:text-24">
            여행글
          </span>
        </div>
        <div className="flex flex-col justify-start gap-24">
          <div className="mx-36 flex gap-16 mobile:mx-0">
            <button className="flex h-44 w-90 items-center justify-center gap-4 rounded-32 bg-primary px-16 py-10 text-center text-16 font-extrabold leading-5 text-white hover:bg-primary-press tablet:h-36 tablet:w-72 tablet:text-14 mobile:h-32">
              인기
            </button>
            <button className="flex h-44 w-90 items-center justify-center gap-4 rounded-32 border-[1.5px] border-primary bg-bg-06 px-16 py-10 text-center text-16 font-extrabold leading-5 text-primary hover:border-primary-press hover:text-primary-press tablet:h-36 tablet:w-72 tablet:text-14 mobile:h-32">
              최신
            </button>
          </div>
          <div className="mx-36 flex items-center justify-center mobile:mx-0">
            <div className="w-[1080px] gap-24 rounded-32 bg-white px-24 pb-8 pt-24 tablet:w-[676px] tablet:gap-16 mobile:w-312 mobile:gap-0">
              <TravelCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
