import Image from "next/image";

export default function Foreign() {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col self-stretch max-w-[1200px] tablet:max-w-[768px] mobile:max-w-360 m-auto w-full gap-40 px-24 py-60 tablet:py-40">
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-start gap-12">
            <Image
              src={"/icons/plane.svg"}
              alt="비행기 아이콘"
              width={40}
              height={40}
            />
            <span className="font-extrabold leading-10 tracking-tight text-center text-text-01 text-32 tablet:text-24">
              해외 여행
            </span>
          </div>
          <div>버튼</div>
        </div>
        <div className="flex items-center justify-center w-full">
          카드 컴포넌트
        </div>
      </div>
    </div>
  );
}
