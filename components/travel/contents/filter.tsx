import FilterBtn from "@/components/travel/contents/filterBtn";
const filterMock = [
  "전체",
  "여자만",
  "남자만",
  "여자/남자",
  "모집 중",
  "모집 완료",
  "모집 예정",
];
// interface FilterProps {
//   search: string;
// }

function Filter() {
  return (
    <div className="bg-white tracking-tight text-text-01 relative font-bold border-b border-line-02">
      <div className="max-w-[1200px] w-full m-auto">
        <div className="flex m-auto justify-center gap-12 py-20 px-36">
          {filterMock.map((item, index) => (
            <FilterBtn key={index} text={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Filter;
