import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import BookmarkContent from "@/components/mytravel/modal/content/Bookmark";
import ParticipatingContent from "@/components/mytravel/modal/content/Participating";
import RecruitingContent from "@/components/mytravel/modal/content/Recruiting";

interface MyTravelModalProps {
  data: any;
  onClose: () => void;
  selectTab: string;
}

export default function MyTravelModal({
  data,
  onClose,
  selectTab,
}: MyTravelModalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  let title = "";

  switch (selectTab) {
    case "참여 중":
      title = "길동무 참여 정보";
      break;
    case "모집 중":
      title = "길동무 모집 정보";
      break;
    case "찜":
      title = "찜한 길동무 정보";
      break;
    default:
      break;
  }

  useEffect(() => {
    const body = document.body;
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    body.appendChild(modalRoot);
    setPortalRoot(modalRoot);
    return () => {
      body.removeChild(modalRoot);
    };
  }, []);

  return (
    portalRoot &&
    createPortal(
      <div className="fixed inset-0 z-30 flex h-full w-full items-center justify-center bg-dim-60">
        <div
          className={`relative flex ${selectTab === "찜" ? "h-auto w-[565px] rounded-32 mobile:w-[320px]" : `h-[90%] ${selectTab === "모집 중" && "w-[1200px]"} w-[760px] tablet:min-h-screen tablet:w-full tablet:rounded-0`} flex-col items-center overflow-x-hidden rounded-32 bg-white shadow-md`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex w-full items-center justify-between border border-b-[#D4D4D4] py-24 pl-40 pr-32 tablet:py-16 tablet:pl-32 tablet:pr-24">
            <span className="leading-32 text-center text-20 font-bold text-text-01 mobile:text-18">
              {title}
            </span>
            <button
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
            >
              <Image
                src={"/icons/close.svg"}
                alt="닫기 이미지"
                width={32}
                height={32}
              />
            </button>
          </div>
          <div className="flex flex-col items-start justify-center px-40 pb-40 pt-30 tablet:px-32 tablet:pt-32 mobile:p-24">
            <div className="mb-20 flex w-full items-center justify-between mobile:flex-col-reverse mobile:items-start mobile:gap-12">
              <div className="flex items-center justify-center gap-12">
                <Image
                  src={"/icons/모몽가2.png"}
                  alt="프로필 이미지"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-4">
                  <span className="text-16 font-bold leading-[130%] tracking-[-0.6px] text-text-03 tablet:text-14">
                    유저 이름
                  </span>
                  <div className="text-18 font-bold leading-[130%] tracking-[-0.6px] text-text-01 tablet:text-16">
                    길동무 모집 상세 페이지 제목
                  </div>
                </div>
              </div>
              <div
                className={`rounded-24 border bg-white px-16 py-7 text-16 leading-[130%] tracking-[-0.6px] ${"border-stone-400 text-stone-400"} tablet:px-12 tablet:py-5 tablet:text-14`}
              >
                모집완료
              </div>
            </div>
            <div className="mb-32 flex flex-col items-start gap-8 mobile:mb-24">
              <div className="line-clamp-3 overflow-hidden text-16 font-normal leading-[150%] tracking-[-0.6px] tablet:text-14">
                여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가
                필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지
                필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의
                여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류.
                세 번
              </div>
              {/* <Link href={`/travel/${data.id}/detail`}> */}
              <div className="flex cursor-pointer items-center justify-center gap-4">
                <span className="text-16 font-bold leading-[130%] tracking-[-0.6px] text-text-04">
                  모집글 자세히 보기
                </span>
                <Image
                  src={"/icons/chevron-right-gray.png"}
                  alt="화살표 이미지"
                  width={20}
                  height={20}
                />
              </div>
              {/* </Link> */}
            </div>
            {selectTab === "참여 중" && <ParticipatingContent />}
            {selectTab === "모집 중" && <RecruitingContent />}
            {selectTab === "찜" && <BookmarkContent />}
          </div>
        </div>
      </div>,
      document.body,
    )
  );
}
