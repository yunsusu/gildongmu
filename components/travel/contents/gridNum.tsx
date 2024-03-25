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
      className={`flex h-32 w-32 cursor-pointer items-center justify-center rounded-full ${Number(page) === num && "bg-line-05 text-blue-600"} ${page === undefined && num === 1 && "bg-line-05 text-blue-600"}`}
      onClick={() => changePage(num - 1)}
    >
      {num}
    </div>
  );
}
export default GridNum;
