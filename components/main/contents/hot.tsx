import CountryCarousel from "@/components/carousel/country";

export default function Hot() {
  const titleIcon = "/icons/icon_hot.svg";

  return (
    <div className="flex flex-col bg-white">
      <div className="m-auto flex w-full max-w-[1200px] flex-col gap-40 self-stretch px-24 py-60 tablet:py-40">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center justify-center">
            <CountryCarousel titleIcon={titleIcon}>HOT</CountryCarousel>
          </div>
        </div>
      </div>
    </div>
  );
}
