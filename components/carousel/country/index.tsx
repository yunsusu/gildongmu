import Image from "next/image";
import React, { useRef } from "react";
import Slider from "react-slick";

import Card from "@/components/card";

interface CountryCarouselProps {
  titleIcon: string;
  children: React.ReactNode;
}

function CountryCarousel({ titleIcon, children }: CountryCarouselProps) {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="slider-container !flex w-full flex-col gap-40">
      <div
        style={{
          textAlign: "end",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center justify-center gap-12">
          <Image src={titleIcon} alt="타이틀 아이콘" width={40} height={40} />
          <span className="text-center text-32 font-extrabold leading-10 tracking-tight text-text-01 tablet:text-24">
            {children}
          </span>
        </div>
        <div className="flex gap-24">
          <button
            className="button flex h-44 w-44 items-center justify-center rounded-full border-[1.5px] border-[#0EA5E9] bg-white p-10 hover:bg-sky-100"
            onClick={previous}
          >
            <div className="relative h-24 w-24">
              <Image
                src={"/icons/chevron-left.svg"}
                alt="캐러셀 다음 버튼"
                fill
              />
            </div>
          </button>
          <button
            className="button flex h-44 w-44 items-center justify-center rounded-full border-[1.5px] border-[#0EA5E9] bg-white p-10 hover:bg-sky-100"
            onClick={next}
          >
            <div className="relative flex h-24 w-24 items-center justify-start">
              <Image
                src={"/icons/chevron-right.png"}
                alt="캐러셀 다음 버튼"
                fill
              />
            </div>
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Slider>
    </div>
  );
}

export default CountryCarousel;
