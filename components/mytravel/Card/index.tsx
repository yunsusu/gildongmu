import Image from "next/image";
import { useEffect, useState } from "react";

import Modal from "@/components/modal";
import Favor from "@/components/mytravel/Card/Favor";
import FilpButton from "@/components/mytravel/Card/FlipButton";
import RecruitmentStatus from "@/components/mytravel/Card/RecruitmentStatus";
import Title from "@/components/mytravel/Card/Title";
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
      className={`tablet:h-270 ${
        isMobile ? "mobile:w-148" : "mobile:w-243"
      } relative flex h-[320px] w-270 cursor-pointer flex-col transition-all duration-500 [transform-style:preserve-3d] ${
        isFlipped ? "[transform:rotateY(180deg)]" : ""
      }  tablet:w-227 mobile:h-176 `}
      onClick={() => {
        setIsModalOpen(!isModalOpen);
      }}
    >
      <div className="absolute inset-0 p-24 tablet:p-20 mobile:p-12">
        <Image
          src={content.thumbnail}
          alt="여행지 이미지"
          fill
          className="rounded-[20px] object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-[20px] bg-black opacity-20" />
        <div className="absolute flex flex-col items-start justify-between gap-16">
          <div className="flex items-center justify-between self-stretch">
            <RecruitmentStatus recruitmentStatus={content.status} />
            <Favor />
          </div>
          <div
            className={`mb-160 flex flex-col gap-4 tablet:mb-170 ${isMobile ? "mobile:mb-25" : "mobile:mb-50"} `}
          >
            <Title title={content.title} type="front" />
            <div className="text-14 font-normal leading-5 tracking-tighter text-white tablet:text-12">
              {content.nickname}
            </div>
          </div>
        </div>
        <FilpButton
          type="front"
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-start rounded-[20px] border border-[#818CF8] bg-white p-24 [transform:rotateY(180deg)] [backface-visibility:hidden] tablet:p-20 mobile:p-12">
        <Title title={content.title} type="back" />
        <Image src={"/icons/dotline.svg"} alt="선" width={222} height={1} />
        <div
          className={`mb-110 mt-24 flex flex-col justify-start tablet:mb-135 tablet:mt-16 mobile:mt-10 ${
            isMobile ? "mobile:mb-4" : "mobile:mb-35"
          } `}
        >
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
              <Image src={"/icons/tag.svg"} alt="태그" width={16} height={16} />
            </div>
            <div className="text-14 font-normal leading-5 tracking-tighter text-text-02 tablet:text-12">
              야돈만
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
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
        <FilpButton
          type="back"
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      </div>
      {isModalOpen && (
        <Modal
          modalType="signupSuccess"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
