import Image from "next/image";
import { useRouter } from "next/router";

export default function MyTravelHeader() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex h-160 w-full items-center justify-center self-stretch bg-[#818CF8] px-24 pb-42 pt-36 tablet:h-152">
      <div className="mobile:max-w-360 relative flex max-w-[1200px] items-center gap-18 tablet:max-w-[768px]">
        <button className="absolute -left-32" onClick={goBack}>
          <Image
            src={"/icons/chevron-left-white.svg"}
            alt="뒤로가기 아이콘"
            width={32}
            height={32}
          />
        </button>
        <div className="w-[1036px] text-center text-32 font-extrabold leading-9 tracking-tight text-white tablet:w-[636px] tablet:text-24 mobile:w-228">
          내 여행
        </div>
      </div>
    </div>
  );
}
