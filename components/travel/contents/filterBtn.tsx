import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useCardFilterStore from "@/store/cardfilter";
import useSortStore from "@/store/choiceSort";

interface FilterBtnProps {
  text: string;
}

function FilterBtn({ text }: FilterBtnProps) {
  const [choice, setChoice] = useState("bg-blue-200");
  const { cards, cardsOrigin, setCardFilter } = useCardFilterStore();
  const { setChoiceSort } = useSortStore();

  const router = useRouter();

  useEffect(() => {
    const search = router.query.search;
    if (search === undefined && text === "전체") {
      setChoice("bg-yellow-300");
    } else if (search === text) {
      setChoice("bg-yellow-300");
    } else {
      setChoice("bg-blue-200");
    }
  }, [router.query.search, text]);

  const handleFilter = () => {
    switch (text) {
      case "전체":
        setCardFilter(cardsOrigin);
        router.push(`/travel`);
        break;
      case "여자만":
        // setCardFilter(cards.filter((card: any) => card));
        break;
      case "남자만":
        // setCardFilter(cards.filter((card: any) => card));
        break;
      case "여자/남자":
        // setCardFilter(cards.filter((card: any) => card));
        break;
      case "모집 중":
        setCardFilter(
          cardsOrigin.filter((card: any) => card.status === "모집 중"),
        );
        break;
      case "모집 완료":
        setCardFilter(
          cardsOrigin.filter((card: any) => card.status === "모집 완료"),
        );
        break;
      default:
        break;
    }
    if (text !== "전체") {
      router.push(`/travel?search=${encodeURIComponent(text)}`);
    }
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
