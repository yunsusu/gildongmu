import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";

function SkeletonComponent() {
  const router = useRouter();
  const wrap = useMemo(() => {
    if (router.pathname === "/travel") {
      return "max-w-240 w-full h-[310px] block bg-white rounded-16 border border-line-02 m-auto overflow-hidden border-2 border-stone-300 animate-pulse ";
    } else {
      return "tablet:w-196 mobile:max-w-[280px] mobile:min-w-264 mobile:w-full w-240 h-[310px] block bg-white rounded-16  m-auto overflow-hidden border-4 border-stone-300 animate-pulse ";
    }
  }, [router.pathname]);
  return (
    <div className={wrap}>
      <div className="relative flex h-180 w-full flex-col overflow-hidden p-16 text-stone-300 text-opacity-0 tablet:p-12">
        <div className="absolute left-0 top-0 h-full w-full"></div>

        <div className="absolute left-0 top-0 h-full w-full opacity-20"></div>
        <div className="z-1 relative w-full">
          <div className="flex items-center justify-between">
            <div className="rounded-24 bg-stone-300 px-12 py-5 text-14 tablet:px-10 tablet:py-3 tablet:text-12">
              모집 완료
            </div>

            <div className="relative h-24 w-24 ">
              <Image src={"/icons/heartOff.svg"} alt="하트" fill />
            </div>
          </div>

          <div className="mt-16 rounded-16 bg-stone-300 text-16 leading-tight tablet:text-14 ">
            제목
          </div>
          <div className="mt-10 rounded-16 bg-stone-300 text-14">작성자</div>
        </div>
      </div>

      <div className="relative flex h-130 w-full flex-col overflow-hidden text-12 text-stone-300 text-opacity-0">
        <div className="absolute left-0 top-0 flex h-full w-full flex-col bg-stone-300 p-16 tablet:p-12">
          <div className="flex flex-1 items-center gap-8">
            <div className="w-max rounded-8 bg-stone-100">위치 어딘가</div>
          </div>

          <div className="flex flex-1 items-center gap-8">
            <div className="w-max gap-6 rounded-8 bg-stone-100">
              oooo-oo-oo ~ oooo-oo-oo
            </div>
          </div>

          <div className="flex flex-1 items-center gap-8">
            <div className="flex w-max gap-6 rounded-8 bg-stone-100">
              여자만~
            </div>
          </div>

          <div className="flex flex-1 gap-12 text-12">
            <div className="flex items-center gap-4">
              <div className="h-15 w-20 rounded-8 bg-stone-100"></div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-15 w-20 rounded-8 bg-stone-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SkeletonComponent;
