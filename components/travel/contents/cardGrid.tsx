import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Card from "@/components/card";
import GridNum from "@/components/travel/contents/gridNum";
import axios from "@/lib/api/axios";
import useCardFilterStore from "@/store/cardfilter";

function CardGrid() {
  const [pageLimit, setPageLimit] = useState(12);
  const { cards, cardsOrigin, setCardFilter, setCardOrigin } =
    useCardFilterStore();
  console.log(cards);
  const router = useRouter();
  const { page, sort } = router.query;
  const currentPage = parseInt(page as string, 10) || 1;

  const getTravelCard = async (
    pageNum = page || 1,
    limit = pageLimit,
    sortBy = sort,
  ) => {
    try {
      let res;
      if (sortBy) {
        res = await axios.get(
          `/posts?page=${pageNum}&limit=${limit}&sort=${sortBy}`,
        );
      } else {
        res = await axios.get(`/posts?page=${pageNum}&limit=${limit}`);
      }
      console.log(res);
      setCardFilter(res.data);
    } catch (error) {
      console.error(error);
    }
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
    const prevPageNumber = currentPage + 1;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: prevPageNumber },
    });
  };

  useEffect(() => {
    const newCardsOrigin = [
      {
        id: 1,
        title: "여행 모집",
        nickname: "야돈3",
        country: "일본",
        city: "오사카",
        startDate: "2024-03-29",
        endDate: "2024-03-30",
        status: "모집 중",
        thumbnail: "/images/logo.svg",
        countOfComments: 3,
        countOfBookmarks: 5,
      },
      {
        id: 3,
        title: "여행 모집",
        nickname: "3",
        country: "일본",
        city: "오사카",
        startDate: "2024-03-28",
        endDate: "yyyy-mm-dd",
        status: "모집 중",
        thumbnail: "url",
        countOfComments: 5,
        countOfBookmarks: 5,
      },
      {
        id: 5,
        title: "여행모집10",
        nickname: "2",
        country: "한국",
        city: "전주",
        startDate: "2024-03-22",
        endDate: "yyyy-mm-dd",
        status: "모집 완료",
        thumbnail: "url",
        countOfComments: 10,
        countOfBookmarks: 0,
      },
      {
        id: 6,
        title: "가까운여행",
        nickname: "1",
        country: "한국",
        city: "전주",
        startDate: "2024-03-21",
        endDate: "yyyy-mm-dd",
        status: "모집 완료",
        thumbnail: "url",
        countOfComments: 10,
        countOfBookmarks: 0,
      },
    ];

    setCardFilter(
      newCardsOrigin.sort((a, b) => a.countOfComments - b.countOfComments),
    );
    if (page === undefined && sort === undefined) {
      getTravelCard(1, pageLimit);
    } else {
      getTravelCard(page, pageLimit, sort);
    }
  }, [sort, setCardFilter, setCardOrigin, page, pageLimit]);

  return (
    <>
      <div
        className="mx-auto mb-40 grid grid-flow-row auto-rows-max gap-24"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="m-auto flex w-max items-center gap-3">
        <div className="relative h-24 w-24">
          <Image src={"/icons/first_page.svg"} alt="첫페이지" fill />
        </div>
        <div className="relative h-24 w-24 cursor-pointer" onClick={prevPage}>
          <Image src={"/icons/keyboard_arrow_left.svg"} alt="이전페이지" fill />
        </div>
        <div className="flex gap-6 px-5 text-16 font-normal">
          <GridNum num={1} />
          <GridNum num={2} />
          <GridNum num={3} />
        </div>
        <div className="relative h-24 w-24 cursor-pointer" onClick={nextPage}>
          <Image
            src={"/icons/keyboard_arrow_right.svg"}
            alt="다음페이지"
            fill
          />
        </div>
        <div className="relative h-24 w-24">
          <Image src={"/icons/last_page.svg"} alt="마지막페이지" fill />
        </div>
      </div>
    </>
  );
}

export default CardGrid;
