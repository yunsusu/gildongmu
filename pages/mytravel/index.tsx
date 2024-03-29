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
          const temp = await axios.get(
            "/posts/me?page=&size=99&sort=&type=PARTICIPANT",
          );
          res = temp.data.content;
        } else if (selectTab === "모집 중") {
          const temp = await axios.get(
            "/posts/me?page=&size=99&sort=&type=LEADER",
          );
          res = temp.data.content;
        } else {
          const temp = await axios.get("/bookmarks");
          res = temp.data;
        }

        setCardData(res);
        console.log(res);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    getCardData();
  }, [selectTab]);

  console.log(cardData);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#818CF8]">
      <MyTravelHeader />
      <TabMenu selectTab={selectTab} onTabChange={handleTabChange} />
      <div className="z-5 mt-40 flex w-full items-center justify-center">
        <div
          className={`relative flex min-h-screen w-full justify-center rounded-t-48 bg-white ${cardData && cardData.length > 0 ? "py-80" : "py-[250px]"} px-24 tablet:py-64`}
        >
          <Image
            src={"/icons/motorcycle.svg"}
            alt="오도방구 아이콘"
            width={100}
            height={100}
            className="absolute -top-70 right-[8%] h-100 w-100 mobile:hidden"
          />
          <div
            className={`gap-24 ${cardData && cardData.length > 0 ? "grid grid-flow-row auto-rows-max grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2" : "flex flex-wrap items-center justify-center self-stretch"}`}
          >
            {cardData && cardData.length > 0 ? (
              cardData.map((card, index) => (
                <MyTravelCard key={index} data={card} selectTab={selectTab} />
              ))
            ) : (
              <div className="flex h-screen w-full flex-col items-center gap-32 bg-white tablet:gap-24">
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
