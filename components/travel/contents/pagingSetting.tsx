import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import Dropdown from "@/components/DropDown";
import useToggle from "@/hooks/useToggle";
import useSortStore from "@/store/choiceSort";

function PagingSetting() {
  const { choiceSort, setChoiceSort } = useSortStore();

  const [dropDown, setDropDown, handleDropDown] = useToggle();

  const router = useRouter();
  const { sortby } = router.query;

  const handleSort = (type: string) => {
    const sortType = type;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sortby: sortType },
    });
  };

  const travels = [
    {
      name: "최근 작성순",
      handleBtn: () => {
        setChoiceSort("최근 작성순");
        handleSort("latest");
      },
    },
    {
      name: "인기순",
      handleBtn: () => {
        setChoiceSort("인기순");
        handleSort("popular");
      },
    },
    {
      name: "댓글 많은 순",
      handleBtn: () => {
        setChoiceSort("댓글 많은 순");
        handleSort("comment");
      },
    },
    {
      name: "가까운 여행순",
      handleBtn: () => {
        setChoiceSort("가까운 여행순");
        handleSort("trip");
      },
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    dropDown && handleDropDown();
  });

  useEffect(() => {
    switch (sortby) {
      case "latest":
        setChoiceSort("최근 작성순");
        break;
      case "popular":
        setChoiceSort("인기순");
        break;
      case "comment":
        setChoiceSort("댓글 많은 순");
        break;
      case "latest-trip":
        setChoiceSort("가까운 여행순");
        break;

      default:
        break;
    }
  }, [setChoiceSort, sortby]);
  return (
    <>
      <div className="mb-32 flex w-full justify-between">
        <div></div>
        <div ref={ref} className="relative">
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
