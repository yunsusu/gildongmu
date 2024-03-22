export default function TabMenu() {
  return (
    <div className="right-359 absolute top-196 flex h-72 w-[480px] items-center justify-center rounded-36 bg-white px-48 py-10 shadow-md tablet:left-174 tablet:top-180 tablet:h-64 tablet:w-[420px] mobile:left-24 mobile:top-180 mobile:h-56 mobile:w-312 mobile:px-24">
      <div className="flex items-center justify-center gap-8">
        <button className="line-height-130 letter-spacing--0.6 flex h-60 w-140 items-center justify-center text-center text-18 font-bold focus:rounded-36 focus:bg-[#E0E7FF] focus:text-[#6366F1] tablet:h-52 tablet:w-123 mobile:h-44 mobile:w-92">
          참여 중
        </button>
        <button className="line-height-130 letter-spacing--0.6 flex h-60 w-140 items-center justify-center text-center text-18 font-bold focus:rounded-36 focus:bg-[#E0E7FF] focus:text-[#6366F1] tablet:h-52 tablet:w-123 mobile:h-44 mobile:w-92">
          모집 중
        </button>
        <button className="line-height-130 letter-spacing--0.6 flex h-60 w-140 items-center justify-center text-center text-18 font-bold focus:rounded-36 focus:bg-[#E0E7FF] focus:text-[#6366F1] tablet:h-52 tablet:w-123 mobile:h-44 mobile:w-92">
          찜
        </button>
      </div>
    </div>
  );
}
