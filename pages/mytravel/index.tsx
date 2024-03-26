import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import MyTravelHeader from "@/components/header/mytravel";
import MyTravelCard from "@/components/mytravel/card";
import TabMenu from "@/components/mytravel/tabMenu";
import axios from "@/lib/api/axios";
import { scrollToTop } from "@/pages/travel/[Id]/detail";

export default function MyTravel() {
  const [selectTab, setSelectTab] = useState("참여 중");
  const [cardData, setCardData] = useState([]);

  const handleTabChange = (tab: string) => {
    setSelectTab(tab);
  };

  useEffect(() => {
    const getCardData = async () => {
      try {
        let res;
        if (selectTab === "참여 중") {
          res = await axios.get("/posts");
        } else if (selectTab === "모집 중") {
          res = await axios.get("/posts");
        } else {
          res = await axios.get("/bookmarks");
        }
        const {
          data: { content },
        } = res;
        setCardData(content);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    getCardData();
  }, [selectTab]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#818CF8]">
      <MyTravelHeader />
      <TabMenu selectTab={selectTab} onTabChange={handleTabChange} />
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
            {cardData && cardData.length > 0 ? (
              cardData.map((card, index) => (
                <MyTravelCard key={index} data={card} selectTab={selectTab} />
              ))
            ) : (
              <div className="flex min-h-screen w-full flex-col items-center justify-center gap-32 bg-white tablet:gap-24">
                <div className="flex flex-col items-center justify-center gap-24 tablet:gap-20">
                  <div className="h-160 w-240 bg-[#D9D9D9]" />
                  <div className="text-24 font-semibold leading-[31.2px] tracking-tighter text-text-01 tablet:text-20">
                    참여 중인 길동무 모임이 없어요!
                  </div>
                </div>
                <Link href={"/travel"}>
                  <button className="h-52 w-200 rounded-32 border border-stone-700 px-10 py-16 text-center font-bold leading-5 text-stone-700 hover:border-stone-500 hover:text-stone-500 tablet:h-44 tablet:w-180">
                    길동무 찾으러 가기
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="fixed bottom-40 right-40 z-10 h-64 w-64 animate-bounce cursor-pointer tablet:h-56 tablet:w-56 mobile:bottom-20 mobile:right-20"
        onClick={scrollToTop}
      >
        <Image src="/icons/rocket.svg" alt="로켓 이미지" fill />
      </div>
    </div>
  );
}
