import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import Dropdown from "@/components/dropdown";
import useToggle from "@/hooks/useToggle";
import useCardFilterStore from "@/store/cardfilter";
import useSortStore from "@/store/choiceSort";

function PagingSetting() {
  const { choiceSort, setChoiceSort } = useSortStore();
  const { cards, cardsOrigin, setCardFilter } = useCardFilterStore();

  const [dropDown, setDropDown, handleDropDown] = useToggle();

  const today = new Date().getTime();
  const router = useRouter();
  const { sort } = router.query;

  const handleSort = (type: string) => {
    const sortType = type;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: sortType },
    });
  };

  const travels = [
    {
      name: "최근 작성순",
      handleBtn: () => {
        setChoiceSort("최근 작성순");
        handleSort("latest");
        setCardFilter(
          cards.sort((a: { id: number }, b: { id: number }) => b.id - a.id),
        );
      },
    },
    {
      name: "인기순",
      handleBtn: () => {
        setChoiceSort("인기순");
        handleSort("popular");
        setCardFilter(
          cards.sort(
            (
              a: { countOfBookmarks: number },
              b: { countOfBookmarks: number },
            ) => b.countOfBookmarks - a.countOfBookmarks,
          ),
        );
      },
    },
    {
      name: "댓글 많은 순",
      handleBtn: () => {
        setChoiceSort("댓글 많은 순");
        handleSort("mostComments");
        setCardFilter(
          cards.sort(
            (a: { countOfComments: number }, b: { countOfComments: number }) =>
              b.countOfComments - a.countOfComments,
          ),
        );
      },
    },
    {
      name: "가까운 여행순",
      handleBtn: () => {
        setChoiceSort("가까운 여행순");
        handleSort("distance");
        setCardFilter(
          cards.sort(
            (
              a: { startDate: string | number | Date },
              b: { startDate: string | number | Date },
            ) => {
              const dateA = new Date(a.startDate).getTime();
              const dateB = new Date(b.startDate).getTime();
              return dateA - today - (dateB - today);
            },
          ),
        );
      },
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    dropDown && handleDropDown();
  });
  return (
    <>
      <div className="mb-32 flex w-full justify-between">
        <div></div>
        <div ref={ref}>
          <div
            onClick={handleDropDown}
            className="flex cursor-pointer items-center text-16 tablet:text-14"
          >
            {choiceSort} &nbsp;
            <div className="relative h-16 w-16">
              <Image
                src={"/icons/chevron-down.svg"}
                alt="드롭다운 버튼"
                fill
                className={dropDown ? "rotate-180" : ""}
              />
            </div>
          </div>
          {dropDown && (
            <Dropdown
              buttons={travels}
              choiceSort={choiceSort}
              handleDropDown={handleDropDown}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PagingSetting;
