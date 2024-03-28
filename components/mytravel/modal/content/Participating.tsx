import Image from "next/image";

import Chip from "@/components/mytravel/modal/Chip";

export default function ParticipatingContent() {
  return (
    <div className="flex w-full flex-col items-start justify-center rounded-24 border border-line-02">
      <div className="flex h-63 w-full items-center justify-start rounded-t-24 bg-line-02 px-32 py-20 text-16 font-semibold leading-[130%] tracking-[-0.6px] tablet:px-24 tablet:py-16 mobile:px-20">
        {`현재 인원 (n / n)`}
      </div>
      <div className="flex w-full flex-col justify-center gap-10 px-32 py-24 tablet:px-24 tablet:py-20 mobile:px-20 mobile:py-16">
        {
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center gap-12">
              <Image
                src={"/icons/모몽가2.png"}
                alt="프로필 이미지"
                width={32}
                height={32}
                className="rounded-full"
              />
              <Chip chip="leader" />
              <span className="text-16 font-normal leading-[130%] tracking-[-0.6px] text-text-01 mobile:truncate mobile:text-14">
                유저 이름
              </span>
            </div>
            <button className="flex h-36 items-center justify-center rounded-32 bg-primary px-16 py-10 text-center font-bold leading-[20px] text-white hover:bg-primary-press mobile:h-32">
              신청 취소
            </button>
          </div>
        }
      </div>
    </div>
  );
}
