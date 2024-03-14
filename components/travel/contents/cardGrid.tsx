import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Card from "@/components/card";
import GridNum from "@/components/travel/contents/gridNum";

function CardGrid() {
  const [pageLimit, setPageLimit] = useState(12);
  const router = useRouter();
  const { page } = router.query;

  const currentPage = parseInt(page as string, 10) || 1;

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
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setPageLimit(12);
      } else if (window.innerWidth <= 1200 && window.innerWidth > 768) {
        setPageLimit(9);
      } else {
        setPageLimit(6);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="grid gap-24 grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 grid-rows-3 tablet:grid-rows-2 mb-40 mx-auto">
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

      <div className="w-max m-auto gap-3 flex items-center">
        <div className="relative w-24 h-24">
          <Image src={"/icons/first_page.svg"} alt="첫페이지" fill />
        </div>
        <div className="relative w-24 h-24 cursor-pointer" onClick={prevPage}>
          <Image src={"/icons/keyboard_arrow_left.svg"} alt="이전페이지" fill />
        </div>
        <div className="flex gap-6 px-5 text-16 font-normal">
          <GridNum num={1} />
          <GridNum num={2} />
          <GridNum num={3} />
        </div>
        <div className="relative w-24 h-24 cursor-pointer" onClick={nextPage}>
          <Image
            src={"/icons/keyboard_arrow_right.svg"}
            alt="다음페이지"
            fill
          />
        </div>
        <div className="relative w-24 h-24">
          <Image src={"/icons/last_page.svg"} alt="마지막페이지" fill />
        </div>
      </div>
    </>
  );
}

export default CardGrid;
