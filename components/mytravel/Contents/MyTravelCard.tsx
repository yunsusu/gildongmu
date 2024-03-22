import Image from "next/image";
import { useEffect, useState } from "react";

import useToggle from "@/hooks/useToggle";

const content = {
  id: 1,
  title: "모몽가와 함께 여행을 떠날 먼작귀 괌",
  nickname: "모몽가",
  destination: "오사카",
  startDate: "2024-03-15",
  endDate: "2024-03-20",
  status: "모집 중",
  thumbnail: "/icons/모몽가2.png",
  countOfComments: 3,
  countOfBookmarks: 5,
};

export default function MyTravelCard() {
  const [favor, setFavor] = useState(true);
  const [isMobile, setIsMobile] = useToggle(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 492);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  return (
    // <Link href={`/travel/${content.id}/detail`}>
    <div className="[perspective:1000px]">
      <div
        className={`tablet:h-270 ${
          isMobile ? "mobile:w-148" : "mobile:w-243"
        } relative flex h-[320px] w-270 flex-col rounded-[20px] transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "hover:[transform:rotateY(180deg)]" : ""
        }  tablet:w-227 mobile:h-176 `}
      >
        <div className="absolute inset-0 p-24 tablet:p-20 mobile:p-12">
          <Image
            src={content.thumbnail}
            alt="여행지 이미지"
            fill
            className="rounded-[20px] object-cover"
            style={{ opacity: 0.7 }}
          />
          <div className="absolute flex flex-col items-start justify-between gap-16">
            <div className="flex items-center justify-between self-stretch">
              {content.status === "모집 완료" ? (
                <div className="w-max rounded-24 bg-stone-100 px-12 py-5 text-14 text-stone-500 tablet:px-10 tablet:py-3 tablet:text-12">
                  모집 완료
                </div>
              ) : (
                <div className="w-max rounded-24 bg-pink-100 px-12 py-5 text-14 text-pink-500 tablet:px-10 tablet:py-3 tablet:text-12">
                  모집 중
                </div>
              )}
              {favor ? (
                <div
                  className="relative h-24 w-24 cursor-pointer"
                  onClick={() => setFavor(false)}
                >
                  <Image src={"/icons/heartOn.svg"} alt="하트 아이콘" fill />
                </div>
              ) : (
                <div
                  className="relative h-24 w-24 cursor-pointer"
                  onClick={() => setFavor(true)}
                >
                  <Image src={"/icons/heartOff.svg"} alt="빈하트 아이콘" fill />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-16 font-bold leading-5 tracking-tighter tablet:text-14">
                {content.title}
              </div>
              <div className="text-14 font-normal leading-5 tracking-tighter tablet:text-12">
                {content.nickname}
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-18 right-18 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full bg-white p-2 tablet:bottom-14 tablet:right-16 mobile:bottom-8 mobile:right-10"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <Image
              src={"/icons/arrow-left-right.svg"}
              alt="뒤집기 아이콘"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-start rounded-[20px] border border-[#818CF8] bg-white p-24 [backface-visibility:hidden] [transform:rotateY(180deg)] tablet:p-20 mobile:p-12">
          <div className="mb-24 text-16 font-bold leading-5 tracking-tighter tablet:mb-16 tablet:text-14 mobile:mb-10">
            {content.title}
          </div>
          <Image src={"/icons/dotline.svg"} alt="선" width={222} height={1} />
          <div className="mt-24 flex flex-col justify-start tablet:mt-16 mobile:mt-10">
            <div className="flex items-center gap-8">
              <div className="tablet:h-12 tablet:w-12">
                <Image
                  src={"/icons/location.svg"}
                  alt="위치"
                  width={16}
                  height={16}
                />
              </div>
              <div className="text-14 font-normal leading-5 tracking-tighter text-text-02 tablet:text-12">
                {content.destination}
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="tablet:h-12 tablet:w-12">
                <Image
                  src={"/icons/calendar.svg"}
                  alt="일정"
                  width={16}
                  height={16}
                />
              </div>
              <div className="text-14 font-normal leading-5 tracking-tighter text-text-02 tablet:text-12">
                {content.startDate} ~ {content.endDate}
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="tablet:h-12 tablet:w-12">
                <Image
                  src={"/icons/tag.svg"}
                  alt="태그"
                  width={16}
                  height={16}
                />
              </div>
              <div className="text-14 font-normal leading-5 tracking-tighter text-text-02 tablet:text-12">
                야돈만
              </div>
            </div>
          </div>
          <div
            className={`mt-110 flex items-center justify-start tablet:mt-135 ${
              isMobile ? "mobile:mt-4" : "mobile:mt-35"
            } `}
          >
            <div className="flex gap-12 text-12">
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={"/icons/heart.svg"}
                  alt="좋아요 수"
                  width={10}
                  height={10}
                />
                <div className="text-14 font-normal leading-5 tracking-tighter text-text-04 tablet:text-12">
                  {content.countOfBookmarks}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={"/icons/comment.svg"}
                  alt="댓글 수"
                  width={10}
                  height={10}
                />
                <div className="text-14 font-normal leading-5 tracking-tighter text-text-04 tablet:text-12">
                  {content.countOfComments}
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-18 right-18 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full bg-[#A5B4FC] p-2 tablet:bottom-14 tablet:right-16 mobile:bottom-8 mobile:right-10"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <Image
              src={"/icons/arrow-white-left-right.svg"}
              alt="뒤집기 아이콘"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
}
