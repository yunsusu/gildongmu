import Image from "next/image";
import Link from "next/link";
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
    document.body.style.overflow = "hidden";

    const body = document.body;
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    body.appendChild(modalRoot);
    setPortalRoot(modalRoot);
    return () => {
      body.removeChild(modalRoot);
      document.body.style.overflow = "auto";
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
          <div className="flex w-full flex-col justify-center px-40 pb-40 pt-30 tablet:px-32 tablet:pt-32 mobile:p-24">
            <div className="mb-20 flex w-full items-center justify-between mobile:flex-col-reverse mobile:items-start mobile:gap-12">
              <div className="flex items-center justify-center gap-12">
                <Image
                  src={
                    data.thumbnail
                      ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${data.thumbnail}`
                      : "/icons/defaultProfile.png"
                  }
                  alt="프로필 이미지"
                  width={48}
                  height={48}
                  className="h-48 w-48 rounded-full object-cover"
                />
                <div className="flex flex-col gap-4">
                  <span className="text-16 font-bold leading-[130%] tracking-[-0.6px] text-text-03 tablet:text-14">
                    {data.nickname}
                  </span>
                  <div className="text-18 font-bold leading-[130%] tracking-[-0.6px] text-text-01 tablet:text-16">
                    {data.title}
                  </div>
                </div>
              </div>
              <div
                className={`rounded-24 border bg-white px-16 py-7 text-16 leading-[130%] tracking-[-0.6px] ${data.status === "모집 중" ? "border-none bg-[#FCE7F3] text-pink-500" : "border-stone-400 text-stone-400"} tablet:px-12 tablet:py-5 tablet:text-14`}
              >
                {data.status}
              </div>
            </div>
            <div className="mb-32 flex flex-col items-start gap-8 mobile:mb-24">
              <div className="line-clamp-3 overflow-hidden text-16 font-normal leading-[150%] tracking-[-0.6px] tablet:text-14">
                {data.content}
              </div>
              <Link href={`/travel/${data.id}/detail`}>
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
              </Link>
            </div>
            {selectTab === "참여 중" && (
              <ParticipatingContent data={data} onClose={onClose} />
            )}
            {selectTab === "모집 중" && <RecruitingContent data={data} />}
            {selectTab === "찜" && (
              <BookmarkContent data={data} onClose={onClose} />
            )}
          </div>
        </div>
      </div>,
      document.body,
    )
  );
}
