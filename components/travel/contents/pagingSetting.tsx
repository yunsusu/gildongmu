import Image from "next/image";
import { useState } from "react";

import Dropdown from "@/components/dropdown";
import useToggle from "@/hooks/useToggle";
import useGnbStore from "@/store/gnb";

function PagingSetting() {
  const [choiceSort, setChoiceSort] = useState("최근 작성순");

  const { gnbColor } = useGnbStore();
  const [dropDown, setDropDown, handleDropDown] = useToggle();

  const travels = [
    {
      name: "최근 작성순",
      link: "",
      handleBtn: () => setChoiceSort("최근 작성순"),
    },
    {
      name: "인기순",
      link: "",
      handleBtn: () => setChoiceSort("인기순"),
    },
    {
      name: "댓글 많은 순",
      link: "",
      handleBtn: () => setChoiceSort("댓글 많은 순"),
    },
    {
      name: "가까운 여행순",
      link: "",
      handleBtn: () => setChoiceSort("가까운 여행순"),
    },
  ];
  return (
    <>
      <div className="mb-32 flex w-full justify-between">
        <div></div>
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
      </div>
      {dropDown && (
        <Dropdown
          gnbColor={gnbColor}
          buttons={travels}
          choiceSort={choiceSort}
          handleDropDown={handleDropDown}
        />
      )}
    </>
  );
}

export default PagingSetting;
