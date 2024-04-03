import Image from "next/image";

import { DetailDataType } from "@/lib/api/detail/type";

export default function Images({ data }: DetailDataType) {
  const travelImg = data?.images;
  return (
    <>
      <div className="flex w-full flex-col items-start gap-32 self-stretch tablet:gap-24">
        <span className="text-20 tablet:text-18">이미지</span>
        <div className="flex w-full flex-wrap gap-24 tablet:gap-20 mobile:gap-12">
          {travelImg?.map(({ url, id }) => (
            <div
              key={id}
              className="relative h-[281px] w-[281px] rounded-16 border border-line-02 tablet:h-[210px] tablet:w-[210px] mobile:h-[130px] mobile:w-[130px]"
            >
              <Image
                className="rounded-16 object-cover"
                src={`https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${url}`}
                alt="여행지 이미지"
                fill
              />
            </div>
          ))}
        </div>
      </div>
      <div id="destination" className="-translate-y-25"></div>
    </>
  );
}
