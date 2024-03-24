import Image from "next/image";

import MyTravelHeader from "@/components/header/mytravel";
import MyTravelCard from "@/components/mytravel/card";
import TabMenu from "@/components/mytravel/tabMenu";

export default function MyTravel() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-[#818CF8]">
      <MyTravelHeader />
      <TabMenu />
      <div className="z-10 flex w-full items-center justify-center">
        <div className="mobile:max-w-360 relative w-full max-w-[1200px] rounded-t-48 bg-white py-80 tablet:max-w-[768px] tablet:py-64">
          <Image
            src={"/icons/motorcycle.svg"}
            alt="오도방구 아이콘"
            width={100}
            height={100}
            className="absolute -top-70 right-[8%] h-100 w-100 mobile:hidden"
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
    </div>
  );
}
