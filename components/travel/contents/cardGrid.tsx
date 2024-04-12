import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Card from "@/components/card";
import SkeletonComponent from "@/components/card/Skeleton";
import GridNum from "@/components/travel/contents/gridNum";
import { getTravelCard } from "@/lib/api/travel";
interface itemType {
  id: number;
  title: string;
  nickname: string;
  destination: string;
  tripDate: [
    {
      startDate: string;
      endDate: string;
    },
  ];
  numberOfPeople: number;
  gender: string;
  content: string;
  status: string;
  tag: [string];
  thumbnail: string;
  countOfComments: number;
  countOfBookmarks: number;
  myBookmark: boolean;
}
export interface CardData {
  content: itemType[];
  totalPages: number;
  numberOfElements: number;
}

function CardGrid() {
  const [gridColumns, setGridColumns] = useState("grid-cols-4");

  const pageLimit = 12;

  const router = useRouter();
  const { page, sortby, filter, search } = router.query;
  const currentPage = parseInt(page as string, 10) || 0;
  const sortValue = Array.isArray(sortby) ? sortby[0] : sortby;
  const filterValue = Array.isArray(filter) ? filter[0] : filter;
  const searchValue = Array.isArray(search) ? search[0] : search;

  const { data: card, isLoading } = useQuery<CardData>({
    queryKey: [
      "cards",
      { page, sort: sortValue, filter: filterValue, searchValue },
    ],
    queryFn: () =>
      getTravelCard(
        currentPage,
        pageLimit,
        sortValue,
        filterValue,
        searchValue,
      ),
  });

  const firstLastPage = (num: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: num },
    });
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const prevPageNumber = currentPage - 1;
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: prevPageNumber },
      });
    }
  };
  const nextPage = () => {
    if (currentPage < Number(card?.totalPages) - 1) {
      const prevPageNumber = currentPage + 1;
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: prevPageNumber },
      });
    }
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 572) {
        setGridColumns("grid-cols-1");
      } else if (window.innerWidth <= 768) {
        setGridColumns("grid-cols-2");
      } else if (window.innerWidth <= 1199) {
        setGridColumns("grid-cols-3");
      } else {
        setGridColumns("grid-cols-4");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className={`mx-auto mb-40 grid grid-flow-row auto-rows-max gap-24 tablet:gap-20 ${gridColumns}`}
        >
          {Array.from({ length: pageLimit }).map((_, index) => (
            <SkeletonComponent key={index} />
          ))}
        </div>
      ) : card?.numberOfElements ? (
        <div
          className={`mx-auto mb-40 grid grid-flow-row auto-rows-max gap-24 tablet:gap-20 ${gridColumns}`}
        >
          {card?.content.map((item: itemType, index: number) => (
            <Card key={index} content={item} />
          ))}
        </div>
      ) : (
        <div className="h-[450px] w-full">
          <div className="relative left-1/2 top-1/3 h-200 w-300 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={"/images/Image_None.png"}
              objectFit="cover"
              fill
              alt="이미지 없음"
            />
          </div>
        </div>
      )}

      <div className="m-auto flex w-max items-center gap-3">
        <div
          className="relative h-24 w-24 cursor-pointer"
          onClick={() => firstLastPage(0)}
        >
          <Image src={"/icons/first_page.svg"} alt="첫페이지" fill />
        </div>
        <div className="relative h-24 w-24 cursor-pointer" onClick={prevPage}>
          <Image src={"/icons/keyboard_arrow_left.svg"} alt="이전페이지" fill />
        </div>
        <div className="flex gap-6 px-5 text-16 font-normal">
          {Array.from({ length: card?.totalPages || 0 }, (_, index) => {
            let isWithinRange =
              index >= Number(page) - 2 && index <= Number(page) + 2;

            if (
              Number(page) === 0 ||
              page === undefined ||
              Number(page) === 1
            ) {
              isWithinRange = index < 5;
            } else if (Number(page) === Number(card?.totalPages) - 1) {
              isWithinRange = index >= Number(page) - 4;
            } else if (Number(page) === Number(card?.totalPages) - 2) {
              isWithinRange = index >= Number(page) - 3;
            }

            return isWithinRange ? (
              <GridNum key={index} num={index + 1} />
            ) : null;
          })}
        </div>
        <div className="relative h-24 w-24 cursor-pointer" onClick={nextPage}>
          <Image
            src={"/icons/keyboard_arrow_right.svg"}
            alt="다음페이지"
            fill
          />
        </div>
        <div
          className="relative h-24 w-24 cursor-pointer"
          onClick={() => firstLastPage(Number(card?.totalPages) - 1)}
        >
          <Image src={"/icons/last_page.svg"} alt="마지막페이지" fill />
        </div>
      </div>
    </>
  );
}

export default CardGrid;
