import Image from "next/image";
import { useEffect, useState } from "react";

import Chip from "@/components/mytravel/modal/Chip";
import useToggle from "@/hooks/useToggle";

export default function RecruitingContent() {
  const [isMobile, setIsMobile] = useToggle(true);
  const [pass, setPass] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
      setPass(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  const header = (text: string) => (
    <div
      className={`flex h-63 w-full items-center justify-${isMobile ? "between" : "start"} rounded-t-24 bg-line-02 px-32 py-20`}
    >
      {isMobile && (
        <button
          onClick={() => {
            setPass(!pass);
          }}
        >
          <Image
            src="/icons/chevron-left-gray.png"
            alt="화살표 이미지"
            width={24}
            height={24}
          />
        </button>
      )}
      <div className="text-16 font-semibold leading-[130%] tracking-[-0.6px]">
        {text}
      </div>
      {isMobile && (
        <button
          onClick={() => {
            setPass(!pass);
          }}
        >
          <Image
            src="/icons/chevron-right-gray.png"
            alt="화살표 이미지"
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );

  const user = () => (
    <div className="flex items-center justify-center gap-12">
      <Image
        src="/icons/모몽가2.png"
        alt="프로필 이미지"
        width={32}
        height={32}
        className="rounded-full"
      />
      <Chip chip="leader" />
      <span className="truncate text-16 font-normal leading-[130%] tracking-[-0.6px] text-text-01 mobile:text-14">
        유저 이름
      </span>
    </div>
  );

  const button = (text: string) => (
    <div className="flex items-center justify-center">
      {pass && text === "현재 인원 (n / n)" ? (
        <button className="flex h-36 items-center justify-center py-10 text-center font-bold leading-[20px] text-stone-700 hover:text-stone-500 mobile:h-32">
          추방하기
        </button>
      ) : (
        <div className="flex items-center gap-10">
          <button className="flex h-36 items-center justify-center py-10 text-center font-bold leading-[20px] text-stone-700 hover:text-stone-500 mobile:h-32">
            거절
          </button>
          <button className="flex h-36 items-center justify-center py-10 text-center font-bold leading-[20px] text-primary hover:text-primary-press mobile:h-32">
            수락
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex w-full items-center justify-center gap-24 tablet:flex-col">
      <div className="flex w-full flex-col items-start justify-center rounded-24 border border-line-02">
        {header(pass ? "현재 인원 (n / n)" : "신청자 목록")}
        <div className="flex h-[400px] w-full flex-col gap-10 overflow-scroll overflow-x-hidden py-24 pl-32 pr-24 tablet:h-[297px] tablet:px-24 tablet:py-20 mobile:px-20 mobile:py-16">
          {
            <>
              <div className="flex w-full items-center justify-between">
                {user()}
                {button(pass ? "현재 인원 (n / n)" : "신청자 목록")}
              </div>
              <div className="flex w-full items-center justify-between">
                {user()}
                {button(pass ? "현재 인원 (n / n)" : "신청자 목록")}
              </div>
              <div className="flex w-full items-center justify-between">
                {user()}
                {button(pass ? "현재 인원 (n / n)" : "신청자 목록")}
              </div>
              <div className="flex w-full items-center justify-between">
                {user()}
                {button(pass ? "현재 인원 (n / n)" : "신청자 목록")}
              </div>
              <div className="flex w-full items-center justify-between">
                {user()}
                {button(pass ? "현재 인원 (n / n)" : "신청자 목록")}
              </div>
              <div className="flex w-full items-center justify-between">
                {user()}
                {button(pass ? "현재 인원 (n / n)" : "신청자 목록")}
              </div>
              <div className="flex w-full items-center justify-between">
                {user()}
                {button(pass ? "현재 인원 (n / n)" : "신청자 목록")}
              </div>
            </>
          }
        </div>
      </div>
      {!isMobile && (
        <div className="flex w-full flex-col items-start justify-center rounded-24 border border-line-02">
          {header("신청자 목록")}
          <div className="flex h-[400px] w-full flex-col gap-10 overflow-scroll overflow-x-hidden py-24 pl-32 pr-24 tablet:h-[297px] tablet:px-24 tablet:py-20 mobile:px-20 mobile:py-16">
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>{" "}
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>{" "}
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>{" "}
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>{" "}
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>{" "}
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>{" "}
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>
            <div className="flex w-full items-center justify-between">
              {user()}
              {button("신청자 목록")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
