import Link from "next/link";

import CommuChat from "@/components/community/commuChat";

function CommuList() {
  return (
    <div
      style={{ height: "calc(100% - 120px)" }}
      className="m-auto h-full w-full max-w-[1200px] px-40 pb-40 tablet:px-20 tablet:pb-20"
    >
      <div className="border-Dimensions-05 h-full w-full overflow-hidden rounded-32 border-2 bg-white px-32 py-40">
        <div className="h-full w-full overflow-y-scroll bg-white">
          {/* 나중에 리스트 데이터 받아오면 true 수정 */}
          {true ? (
            <>
              <CommuChat />
              <CommuChat />
              <CommuChat />
              <CommuChat />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-32 bg-white tablet:gap-24">
              <div className="justify-cente flex flex-col items-center gap-24 tablet:gap-20">
                <div className="h-160 w-240 bg-[#D9D9D9]" />
                <div className="text-24 font-semibold leading-[31.2px] tracking-tighter text-text-01 tablet:text-20">
                  참여 중인 길동무 모임이 없어요!
                </div>
              </div>
              <Link href={"/travel"}>
                <button className="flex w-200 items-center justify-center rounded-32 border border-stone-700 px-10 py-16 text-center font-bold leading-5 text-stone-700 hover:border-stone-500 hover:text-stone-500 tablet:h-44 tablet:w-180">
                  길동무 찾으러 가기
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CommuList;
