import React from "react";

interface TabMenuProps {
  selectTab: string;
  onTabChange: (tab: string) => void;
}

function TabMenu({ selectTab, onTabChange }: TabMenuProps) {
  return (
    <div className="absolute top-120 z-10 flex h-72 w-[480px] items-center justify-center rounded-36 bg-white px-48 py-10 shadow-md tablet:h-64 tablet:w-[420px] mobile:top-130 mobile:h-56 mobile:w-312 mobile:px-24">
      <div className="flex items-center justify-center gap-8">
        <button
          className={`line-height-130 letter-spacing--0.6 flex h-60 w-150 items-center justify-center text-center text-18 font-bold tablet:h-52 tablet:w-130 mobile:h-44 mobile:w-94 mobile:text-14 ${selectTab === "참여 중" ? "rounded-36 bg-[#E0E7FF] text-[#6366F1]" : ""}`}
          onClick={() => onTabChange("참여 중")}
        >
          참여 중
        </button>
        <button
          className={`line-height-130 letter-spacing--0.6 flex h-60 w-150 items-center justify-center text-center text-18 font-bold tablet:h-52 tablet:w-130 mobile:h-44 mobile:w-94 mobile:text-14 ${selectTab === "모집 중" ? "rounded-36 bg-[#E0E7FF] text-[#6366F1]" : ""}`}
          onClick={() => onTabChange("모집 중")}
        >
          모집 중
        </button>
        <button
          className={`line-height-130 letter-spacing--0.6 flex h-60 w-150 items-center justify-center text-center text-18 font-bold tablet:h-52 tablet:w-130 mobile:h-44 mobile:w-94 mobile:text-14 ${selectTab === "찜" ? "rounded-36 bg-[#E0E7FF] text-[#6366F1]" : ""}`}
          onClick={() => onTabChange("찜")}
        >
          찜
        </button>
      </div>
    </div>
  );
}

export default TabMenu;
