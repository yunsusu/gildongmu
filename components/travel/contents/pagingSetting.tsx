import Image from "next/image";
import { useState } from "react";

import Dropdown from "@/components/gnb/Dropdown";
import useToggle from "@/hooks/useToggle";
import useGnbStore from "@/store/gnb";

function PagingSetting() {
  const [choiceSort, setChoiceSort] = useState("최근 작성순");

  const { gnbColor } = useGnbStore();
  const [dropDown, setDropDown, handleDropDown] = useToggle();

  const handleSort = (name: string) => {
    setChoiceSort(name);
  };
  return (
    <>
      <div className="w-full flex justify-between mb-32">
        <div className="flex gap-8">
          <div className="w-24 h-24 relative cursor-pointer">
            <Image src={"/icons/layout-grid.svg"} alt="그리드버전" fill />
          </div>
          <div className="w-24 h-24 relative cursor-pointer">
            <Image src={"/icons/list.svg"} alt="리스트버전" fill />
          </div>
        </div>
        <div
          onClick={handleDropDown}
          className="text-18 flex items-center cursor-pointer"
        >
          {choiceSort} &nbsp;
          <div className="w-16 h-16 relative">
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
          handleBtn={handleSort}
          handleDropDown={handleDropDown}
        />
      )}
    </>
  );
}

const travels = [
  {
    name: "최근 작성순",
    link: "",
  },
  {
    name: "인기순",
    link: "",
  },
  {
    name: "댓글 많은 순",
    link: "",
  },
  {
    name: "가까운 여행순",
    link: "",
  },
];
export default PagingSetting;
