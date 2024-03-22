import Image from "next/image";

import MyTravelCard from "@/components/mytravel/Contents/MyTravelCard";

export default function Contents() {
  return (
    <div className="z-10 flex w-full items-center justify-center">
      <div className="mobile:max-w-360 relative w-full max-w-[1200px] rounded-t-48 bg-white py-80 tablet:max-w-[768px]">
        <Image
          src={"/icons/motorcycle.svg"}
          alt="오도방구 아이콘"
          width={100}
          height={100}
          className="absolute -top-60 right-[8%] mobile:hidden"
        />
        <div className="flex flex-wrap items-center justify-center gap-24 self-stretch">
          <MyTravelCard />
          <MyTravelCard />
          <MyTravelCard />
          <MyTravelCard />
          <MyTravelCard />
          <MyTravelCard />
          <MyTravelCard />
          <MyTravelCard />
          <MyTravelCard />
        </div>
      </div>
    </div>
  );
}
