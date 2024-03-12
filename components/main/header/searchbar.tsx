import Image from "next/image";

export default function Searchbar() {
  const placeholderStyle =
    "placeholder:text-18 placeholder:font-bold placeholder:leading-tight placeholder:tracking-tight tablet:placeholder:text-16";

  return (
    <>
      <div className="relative">
        <input
          className={`flex w-[564px] tablet:w-[564px] mobile:w-312 h-60 tablet:h-52 pt-12 pb-12 pl-24 pr-12 rounded-32 bg-bg-01 tracking-tight leading-tight font-bold text-text-02 text-18 tablet:text-16 ${placeholderStyle}`}
          placeholder="가고 싶은 여행지를 검색해 주세요!"
        />
        <button>
          <Image
            src={"/icons/search.svg"}
            alt="돋보기 아이콘"
            width={24}
            height={24}
            className="absolute top-17 tablet:top-15 right-20"
          />
        </button>
      </div>
    </>
  );
}
