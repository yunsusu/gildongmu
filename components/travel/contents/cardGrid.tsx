import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

import Card from "@/components/card";
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
}
export interface CardData {
  content: itemType[];
}

function CardGrid() {
  const pageLimit = 12;

  const router = useRouter();
  const { page, sort, filter } = router.query;
  const currentPage = parseInt(page as string, 10) || 0;
  const sortValue = Array.isArray(sort) ? sort[0] : sort;
  const filterValue = Array.isArray(filter) ? filter[0] : filter;

  const { data: card } = useQuery<CardData>({
    queryKey: ["cards", { page, sort: sortValue, filter: filterValue }],
    queryFn: () =>
      getTravelCard(currentPage, pageLimit, sortValue, filterValue),
  });
  console.log(card);

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

  // useEffect(() => {
  //   getTravelCard(currentPage, pageLimit, sortValue, filterValue);
  // }, [currentPage, pageLimit, sort, filter, sortValue, filterValue]);

  return (
    <>
      <div
        className="mx-auto mb-40 grid grid-flow-row auto-rows-max gap-24"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {Array.isArray(card?.content)
          ? card?.content.map((item: itemType, index: number) => (
              <Card key={index} content={item} />
            ))
          : null}
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
