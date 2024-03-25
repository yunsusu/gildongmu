import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import MyTravelHeader from "@/components/header/mytravel";
import MyTravelCard from "@/components/mytravel/Card";
import TabMenu from "@/components/mytravel/TabMenu";
import axios from "@/lib/api/axios";

export default function MyTravel() {
  const [selectTab, setSelectTab] = useState("참여 중");
  const [cardData, setCardData] = useState([]);

  const handleTabChange = (tab: string) => {
    setSelectTab(tab);
  };

  useEffect(() => {
    const getParticipatingCardData = async () => {
      try {
        const res = await axios.get("");
        const {
          data: { content },
        } = res;
        setCardData(content);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    const getRecruitingCardData = async () => {
      try {
        const res = await axios.get("");
        const {
          data: { content },
        } = res;
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    const getSavingCardData = async () => {
      try {
        const res = await axios.get("/bookmarks");
        const {
          data: { bookmarks },
        } = res;
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    if (selectTab === "참여 중") {
      getParticipatingCardData();
    } else if (selectTab === "모집 중") {
      getRecruitingCardData();
    } else {
      getSavingCardData();
    }
  }, [cardData, selectTab]);

  // console.log(cardData);

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
                <MyTravelCard key={index} data={card} />
              ))
            ) : (
              <div className="flex min-h-screen w-full flex-col items-center justify-center gap-32 bg-white tablet:gap-24">
                <div className="justify-cente flex flex-col items-center gap-24 tablet:gap-20">
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
    </div>
  );
}
