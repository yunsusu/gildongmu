import Image from "next/image";
import { useEffect, useState } from "react";

import Bookmark from "@/components/mytravel/card/Bookmark";
import FilpButton from "@/components/mytravel/card/FlipButton";
import RecruitmentStatus from "@/components/mytravel/card/RecruitmentStatus";
import Title from "@/components/mytravel/card/Title";
import MyTravelModal from "@/components/mytravel/modal";
import useToggle from "@/hooks/useToggle";

interface MyTravelCardProps {
  data: any;
  selectTab: string;
}

export default function MyTravelCard({ data, selectTab }: MyTravelCardProps) {
  const [isMobile, setIsMobile] = useToggle(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div
      className={`tablet:h-270 relative flex h-[320px] w-270 cursor-pointer flex-col transition-all duration-500 [transform-style:preserve-3d] tablet:w-227 ${
        isMobile ? "mobile:w-148" : "mobile:w-243"
      } ${isFlipped ? "[transform:rotateY(180deg)]" : ""}  mobile:h-176 `}
      onClick={() => {
        setIsModalOpen(!isModalOpen);
      }}
    >
      <div className="absolute inset-0 w-full p-24 tablet:p-20 mobile:p-12">
        <Image
          src={
            data.thumbnail
              ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${data.thumbnail}`
              : "/images/Image_DefaultCard.png"
          }
          alt="여행지 이미지"
          fill
          className="rounded-[20px] object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-[20px] bg-black opacity-20" />
        <div className="absolute flex  flex-col items-start justify-center gap-16">
          <div
            className={`flex w-[222px] items-center justify-between tablet:w-187 ${
              isMobile ? "mobile:w-124" : "mobile:w-219"
            }`}
          >
            <RecruitmentStatus recruitmentStatus={data.status} />
            <Bookmark data={data} />
          </div>
          <div
            className={`mb-160 flex flex-col gap-4 tablet:mb-170 ${isMobile ? "mobile:mb-25" : "mobile:mb-50"} `}
          >
            <Title title={data.title} type="front" />
            <div className="text-14 font-normal leading-5 tracking-tighter text-white tablet:text-12">
              {data.nickname}
            </div>
          </div>
        </div>
        <FilpButton
          type="front"
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-start rounded-[20px] border border-[#818CF8] bg-white p-24 [transform:rotateY(180deg)] [backface-visibility:hidden] tablet:p-20 mobile:p-12">
        <Title title={data.title} type="back" />
        <Image src={"/icons/dotline.svg"} alt="선" width={222} height={1} />
        <div
          className={`mb-115 mt-24 flex flex-col tablet:mb-140 tablet:mt-16 mobile:mt-10 ${
            isMobile ? "mobile:mb-25" : "mobile:mb-20"
          } `}
        >
          <div className="flex flex-col gap-8">
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
                {data.destination}
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
                {data.tripDate.startDate} ~ {data.tripDate.endDate}
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
                {data.gender === "MALE"
                  ? "남자만"
                  : data.gender === "FEMALE"
                    ? "여자만"
                    : "상관없음"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex gap-12 text-12">
            <div className="flex items-center gap-4">
              <Image
                src={"/icons/heart.svg"}
                alt="좋아요 수"
                width={10}
                height={10}
              />
              <div className="text-14 font-normal leading-5 tracking-tighter text-text-04 tablet:text-12">
                {data.countOfBookmarks}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={"/icons/comment.svg"}
                alt="댓글 수"
                width={10}
                height={10}
              />
              <div className="text-14 font-normal leading-5 tracking-tighter text-text-04 tablet:text-12">
                {data.countOfComments}
              </div>
            </div>
          </div>
        </div>
        <FilpButton
          type="back"
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      </div>
      {isModalOpen && selectTab === "참여 중" && (
        <MyTravelModal
          data={data}
          selectTab="참여 중"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isModalOpen && selectTab === "모집 중" && (
        <MyTravelModal
          data={data}
          selectTab="모집 중"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isModalOpen && selectTab === "찜" && (
        <MyTravelModal
          data={data}
          selectTab="찜"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
