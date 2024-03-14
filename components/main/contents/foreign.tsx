import CountryCarousel from "@/components/carousel/country";

export default function Foreign() {
  const titleIcon = "/icons/plane.svg";

  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col self-stretch max-w-[1200px] tablet:max-w-[768px] mobile:max-w-360 m-auto w-full gap-40 px-24 py-60 tablet:py-40">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center w-full">
            <CountryCarousel titleIcon={titleIcon}>국내 여행</CountryCarousel>
          </div>
        </div>
      </div>
    </div>
  );
}
