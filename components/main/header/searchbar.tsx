import Image from "next/image";

export default function Searchbar() {
  const placeholderStyle =
    "placeholder:font-NanumSquareRound placeholder:text-18 placeholder:font-bold placeholder:leading-tight placeholder:tracking-tight mobile:placeholder:text-16";

  return (
    <>
      <div className="relative">
        <input
          className={`flex w-[564px] tablet:w-[564px] mobile:w-312 h-60 tablet:h-52 mobile:h-52 pt-12 pb-12 pl-24 pr-12 rounded-32 bg-bg-01 ${placeholderStyle}`}
          placeholder="가고 싶은 여행지를 검색해 주세요!"
        ></input>
        <button>
          <Image
            src={"/images/search.svg"}
            alt="돋보기 아이콘"
            width={24}
            height={24}
            className="absolute top-15 right-20"
          />
        </button>
      </div>
    </>
  );
}
