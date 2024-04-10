import { motion } from "framer-motion";
import { useState } from "react";

import FilterBtn from "@/components/travel/contents/filterBtn";
const filterMock = [
  "전체",
  "여자만",
  "남자만",
  "여자/남자",
  "모집 중",
  "모집 완료",
];
// interface FilterProps {
//   search: string;
// }

function Filter() {
  const [searchText, setSearch] = useState("전체");
  return (
    <div className="relative border-b border-line-02 bg-white font-bold tracking-tight text-text-01">
      <div
        className="m-auto w-full max-w-[1200px] mobile:overflow-x-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="m-auto flex w-max justify-center gap-12 px-36 py-20 mobile:justify-start mobile:gap-8 mobile:px-24 mobile:py-12">
          {filterMock.map((item, index) => (
            <motion.div
              key={index}
              className="box"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <FilterBtn
                text={item}
                searchText={searchText}
                setSearch={setSearch}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Filter;
