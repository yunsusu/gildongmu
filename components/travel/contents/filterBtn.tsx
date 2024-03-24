import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useSortStore from "@/store/choiceSort";

interface FilterBtnProps {
  text: string;
  search: string;
  setSearch: (search: string) => void;
}

function FilterBtn({ text, search, setSearch }: FilterBtnProps) {
  const [choice, setChoice] = useState("bg-blue-200");
  // const { setCardFilter } = useCardFilterStore();
  const { setChoiceSort } = useSortStore();
  const router = useRouter();
  const { filter } = router.query;

  useEffect(() => {
    let updatedSearch = "";
    switch (filter) {
      case undefined:
        updatedSearch = "전체";
        break;
      case "woman":
        updatedSearch = "여자만";
        break;
      case "man":
        updatedSearch = "남자만";
        break;
      // case "man":
      //   updatedSearch = "여자/남자";
      //   break;
      case "open":
        updatedSearch = "모집 중";
        break;
      case "close":
        updatedSearch = "모집 완료";
        break;
      default:
        break;
    }

    if (updatedSearch) setSearch(updatedSearch);

    setChoice(search === text ? "bg-yellow-300" : "bg-blue-200");
  }, [filter, search, setSearch, text]);

  const handleSort = (type: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, filter: type },
    });
  };

  const handleFilter = () => {
    switch (text) {
      case "전체":
        router.push(`/travel`);
        break;
      case "여자만":
        handleSort("woman");
        break;
      case "남자만":
        handleSort("man");
        break;
      // "여자/남자" 경우는 어떻게 처리해야 할지 명확하지 않아 주석 처리함. 필요하다면 수정해야 함.
      // case "여자/남자":
      //   handleSort("both");
      //   break;
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
    setChoiceSort("최근 작성순"); // 필요하다면 주석 해제
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
