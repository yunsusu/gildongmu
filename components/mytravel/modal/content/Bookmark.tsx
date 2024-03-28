export default function BookmarkContent() {
  return (
    <div className="mt-20 flex w-full items-center justify-center gap-20 tablet:mt-16 mobile:mt-12 mobile:gap-12">
      <button className="flex h-52 w-180 items-center justify-center rounded-12 border-[1.5px] border-primary font-bold leading-[22px] text-primary hover:border-primary-press hover:text-primary-press mobile:h-44 mobile:w-90 mobile:text-16">
        찜 취소
      </button>
      <button className="flex h-52 w-full items-center justify-center rounded-12 bg-primary font-bold leading-[22px] text-white hover:bg-primary-press mobile:h-44 mobile:text-16">
        길동무 신청하기
      </button>
    </div>
  );
}
