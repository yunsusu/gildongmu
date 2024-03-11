import ContryCarousel from "@/components/carousel/country";
import CustomCarousel from "@/components/carousel/custom";

export default function Home() {
  return (
    <>
      <div>
        <span className="text-primary text-8 tablet:text-red-600 mobile:text-blue-700">
          안녕하세요
        </span>
        <div className="w-1200 p-20 flex flex-col justify-center">
          <CustomCarousel />
          <div className="h-30"></div>
          <ContryCarousel />
        </div>
      </div>
    </>
  );
}
