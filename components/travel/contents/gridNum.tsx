import { useRouter } from "next/router";

interface GridNumProps {
  num: number;
}

function GridNum({ num }: GridNumProps) {
  const router = useRouter();
  const { page } = router.query;

  const changePage = (num: number) => {
    const prevPageNumber = num;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: prevPageNumber },
    });
  };

  return (
    <div
      className={`cursor-pointer rounded-full w-32 h-32 flex justify-center items-center ${Number(page) === num && "text-blue-600 bg-line-05"} ${page === undefined && num === 1 && "text-blue-600 bg-line-05"}`}
      onClick={() => changePage(num)}
    >
      {num}
    </div>
  );
}
export default GridNum;
