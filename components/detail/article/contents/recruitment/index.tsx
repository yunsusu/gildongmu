import Image from "next/image";

export default function Recruitment() {
  const tags = ["태그1", "태그2", "태그3"];
  return (
    <div
      id="information"
      className="flex w-full flex-col items-start gap-32 self-stretch pt-60"
    >
      <span>모집 정보</span>
      <div className="flex flex-col items-start gap-24 self-stretch text-16 font-normal">
        <div className="flex flex-col items-start gap-16 self-stretch">
          <div className="flex items-center gap-12 self-stretch">
            <div className="relative h-24 w-24">
              <Image src="/icons/calendar.svg" alt="달력 이미지" fill />
            </div>
            <span>2024/02/29 - 2024/04/08</span>
          </div>
          <div className="flex items-center gap-12 self-stretch">
            <div className="relative h-24 w-24">
              <Image src="/icons/profile.svg" alt="달력 이미지" fill />
            </div>
            <span>nn 명</span>
          </div>
          <div className="flex items-center gap-12 self-stretch">
            <div className="relative h-24 w-24">
              <Image src="/icons/tag.svg" alt="달력 이미지" fill />
            </div>
            <span>남여 상관없음</span>
          </div>
        </div>
        <div className="flex items-start gap-8 self-stretch">
          <div className="h-[211px] w-full resize-none rounded-12 border border-line-02 bg-bg-02 px-16 py-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:h-[214px]">
            {"모집 내용 적힌 부분"}
          </div>
        </div>
        <div className="flex items-start gap-12">
          <span className="flex h-34 items-center gap-5 rounded-24 bg-tag-orange-100 px-13 py-5 text-16 text-tag-orange-500 mobile:h-28 mobile:text-14">
            {tags[0]}
          </span>
          <span className="flex h-34 items-center gap-5 rounded-24 bg-tag-blue-100 px-13 py-5 text-16 text-tag-blue-500 mobile:h-28 mobile:text-14">
            {tags[1]}
          </span>
          <span className="flex h-34 items-center gap-5 rounded-24 bg-tag-pink-100 px-13 py-5 text-16 text-tag-pink-500 mobile:h-28 mobile:text-14">
            {tags[2]}
          </span>
        </div>
      </div>
    </div>
  );
}