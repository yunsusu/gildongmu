import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useCardFilterStore from "@/store/cardfilter";
import useSortStore from "@/store/choiceSort";

interface FilterBtnProps {
  text: string;
  search: string;
  setSearch: any;
}

function FilterBtn({ text, search, setSearch }: FilterBtnProps) {
  const [choice, setChoice] = useState("bg-blue-200");
  const { cards, cardsOrigin, setCardFilter } = useCardFilterStore();
  const { setChoiceSort } = useSortStore();

  const router = useRouter();
  const { sort } = router.query;

  const handleSort = (type: string) => {
    const sortType = type;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: sortType },
    });
  };
  useEffect(() => {
    switch (sort) {
      case "woman":
        setSearch("여자만");
        break;
      case "man":
        setSearch("남자만");
        break;
      case "woman":
        setSearch("여자/남자");
        break;
      case "open":
        setSearch("모집 중");
        break;
      case "close":
        setSearch("모집 완료");
        break;
      default:
        break;
    }
    if (search === text) {
      setChoice("bg-yellow-300");
    } else {
      setChoice("bg-blue-200");
    }
  }, [search, setSearch, sort, text]);

  const handleFilter = () => {
    switch (text) {
      case "전체":
        setCardFilter(cardsOrigin);
        router.push(`/travel`);
        break;
      case "여자만":
        handleSort("woman");
        break;
      case "남자만":
        handleSort("man");
        break;
      case "여자/남자":
        handleSort("woman");
        break;
      case "모집 중":
        handleSort("open");
        break;
      case "모집 완료":
        handleSort("close");
        break;
      default:
        break;
    }
    setSearch(text);
    setChoiceSort("최근 작성순");
  };

  return (
    <div
      onClick={handleFilter}
      className={`text-blue-500 ${choice} max-w-320 min-w-90 cursor-pointer rounded-32 px-16 py-10 text-center text-16 font-extrabold hover:bg-yellow-300 tablet:text-14 mobile:px-12 mobile:py-8`}
    >
      {text}
    </div>
  );
}

export default FilterBtn;
