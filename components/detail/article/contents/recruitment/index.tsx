import Image from "next/image";

import { RecruitmentProps } from "@/lib/api/detail/type";

export default function Recruitment({ data, recruitRef }: RecruitmentProps) {
  const tags = data?.tag;
  let genderText = "상관없음";

  if (data && data.gender) {
    if (data.gender === "MALE") {
      genderText = "남자만";
    } else if (data.gender === "FEMALE") {
      genderText = "여자만";
    }
  }

  return (
    data && (
      <div
        id="information"
        className="relative flex w-full flex-col items-start gap-32 self-stretch pt-60 tablet:gap-24"
      >
        <span className="text-20 tablet:text-18">모집 정보</span>
        <div className="flex flex-col items-start gap-24 self-stretch text-16 font-normal">
          <div className="flex flex-col items-start gap-16 self-stretch">
            <div className="flex items-center gap-12 self-stretch">
              <div className="relative h-24 w-24 tablet:h-20 tablet:w-20">
                <Image src="/icons/calendar.svg" alt="달력 이미지" fill />
              </div>
              <span className="text-16 tablet:text-14">
                {data.tripDate.startDate} - {data.tripDate.endDate}
              </span>
            </div>
            <div className="flex items-center gap-12 self-stretch">
              <div className="relative h-24 w-24 tablet:h-20 tablet:w-20">
                <Image src="/icons/profile.svg" alt="달력 이미지" fill />
              </div>
              <span className="text-16 tablet:text-14">
                {data.numberOfPeople}명
              </span>
            </div>
            <div className="flex items-center gap-12 self-stretch">
              <div className="relative h-24 w-24 tablet:h-20 tablet:w-20">
                <Image src="/icons/tag.svg" alt="달력 이미지" fill />
              </div>
              <span className="text-16 tablet:text-14">{genderText}</span>
            </div>
          </div>
          <div className="flex items-start gap-8 self-stretch">
            <div className="h-[211px] w-full resize-none rounded-12 border border-line-02 bg-bg-02 px-16 py-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:h-[214px] mobile:text-14">
              {data.content}
            </div>
          </div>
          <div className="flex w-full items-start gap-12 tablet:gap-8">
            {tags[0] && (
              <span className="flex items-center justify-center rounded-24 bg-tag-orange-100 px-12 pb-4 pt-5 text-16 text-tag-orange-500 mobile:text-14">
                {tags[0]}
              </span>
            )}
            {tags[1] && (
              <span className="flex items-center justify-center rounded-24 bg-tag-blue-100 px-12 pb-4 pt-5 text-16 text-tag-blue-500 mobile:text-14">
                {tags[1]}
              </span>
            )}
            {tags[2] && (
              <span className="flex items-center justify-center rounded-24 bg-tag-pink-100 px-12 pb-4 pt-5 text-16 text-tag-pink-500 mobile:text-14">
                {tags[2]}
              </span>
            )}
          </div>
        </div>
        <div ref={recruitRef} className="absolute top-[750px] h-1 w-full"></div>
      </div>
    )
  );
}
