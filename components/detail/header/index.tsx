import Image from "next/image";

export default function Header() {
  return (
    <div className="mx-auto flex h-120 w-full max-w-[1200px] items-center justify-between gap-10 px-24 py-10 tablet:h-100 mobile:h-80 mobile:min-w-[312px]">
      <div className="relative flex h-32 w-32 items-center justify-center gap-10 p-8 tablet:h-24 tablet:w-24">
        <Image src="/icons/chevron_left.svg" alt="왼쪽 화살표 이미지" fill />
      </div>
      <div className="max-w-1036 flex h-48 text-center">
        <span className="text-32 font-black leading-[48px] tracking-[0.6px] text-text-01 tablet:text-24">
          상세보기
        </span>
      </div>
      <div className="relative flex h-48 w-48 items-center justify-center gap-10 p-8"></div>
    </div>
  );
}
