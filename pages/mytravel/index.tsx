import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import MyTravelHeader from "@/components/header/mytravel";
import MyTravelCard from "@/components/mytravel/card";
import TabMenu from "@/components/mytravel/tabMenu";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "@/lib/api/axios";
import { scrollToTop } from "@/pages/travel/[Id]/detail";

export default function MyTravel() {
  const [selectTab, setSelectTab] = useState("참여 중");
  const { ref, inView } = useInView();

  const handleTabChange = (tab: string) => {
    setSelectTab(tab);
  };

  const getCardData = useCallback(
    async ({ pageParam = 0 }) => {
      if (selectTab === "참여 중") {
        const res = await axios.get(
          `/posts/me?page=${pageParam}&size=12&sort=&type=PARTICIPANT`,
        );
        return res.data.content;
      } else if (selectTab === "모집 중") {
        const temp = await axios.get(
          `/posts/me?page=${pageParam}&size=12&sort=&type=LEADER`,
        );
        return temp.data.content;
      } else {
        const temp = await axios.get("/bookmarks");
        return temp.data;
      }
    },
    [selectTab],
  );

  const {
    data: cardData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cards", selectTab],
    queryFn: getCardData,
    initialPageParam: 0,

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 12) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },

    retry: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#818CF8]">
      <MyTravelHeader />
      <TabMenu selectTab={selectTab} onTabChange={handleTabChange} />
      <div className="z-5 mt-40 flex w-full items-center justify-center">
        <div
          className={`relative flex min-h-screen w-full justify-center rounded-t-48 bg-white ${
            cardData && cardData.pages?.[0].length > 0
              ? "py-80 tablet:py-64"
              : "py-[250px]"
          } px-24 `}
        >
          <Image
            src={"/icons/motorcycle.svg"}
            alt="오도방구 아이콘"
            width={100}
            height={100}
            className="absolute -top-70 right-[8%] h-100 w-100 mobile:hidden"
          />
          <div
            className={`gap-24 ${
              cardData && cardData.pages?.[0].length > 0
                ? "grid grid-flow-row auto-rows-max grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2"
                : "flex items-center justify-center self-stretch"
            }`}
          >
            {cardData && cardData.pages?.[0].length > 0 && (
              <>
                {cardData.pages.map(page =>
                  page.map((card: any, index: number) => (
                    <MyTravelCard
                      key={index}
                      data={card}
                      selectTab={selectTab}
                    />
                  )),
                )}
              </>
            )}

            {!cardData ||
              (cardData.pages?.[0].length === 0 && (
                <div className="flex h-screen w-full flex-col items-center gap-32 bg-white tablet:gap-24">
                  <div className="flex flex-col items-center justify-center gap-24 tablet:gap-20">
                    <Image
                      src={"/images/Image_Travel.png"}
                      alt="내여행 이미지"
                      width={240}
                      height={160}
                      className="h-160 w-240 tablet:h-128 tablet:w-192"
                    />
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
              ))}

            {hasNextPage && (
              <div className="flex w-full justify-center">
                {isFetchingNextPage ? (
                  <Skeleton className="h-[20px] w-[100px] rounded-full" />
                ) : (
                  <div ref={ref} />
                )}
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
