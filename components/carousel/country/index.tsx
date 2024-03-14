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
    <div className="slider-container !flex flex-col gap-40 w-full">
      <div
        style={{
          textAlign: "end",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center justify-center gap-12">
          <Image src={titleIcon} alt="타이틀 아이콘" width={40} height={40} />
          <span className="font-extrabold leading-10 tracking-tight text-center text-text-01 text-32 tablet:text-24">
            {children}
          </span>
        </div>
        <div className="flex gap-24">
          <button
            className="button flex justify-center items-center w-44 h-44 p-10 border-[1.5px] border-[#0EA5E9] hover:bg-sky-100 rounded-full bg-white"
            onClick={previous}
          >
            <Image
              src="icons/chevron_left.svg"
              alt="캐러셀 다음 버튼"
              width={24}
              height={24}
              objectFit="fill"
            />
          </button>
          <button
            className="button flex justify-center items-center w-44 h-44 p-10 border-[1.5px] border-[#0EA5E9] hover:bg-sky-100 rounded-full bg-white"
            onClick={next}
          >
            <Image
              src="icons/chevron_right.svg"
              alt="캐러셀 다음 버튼"
              width={24}
              height={24}
              objectFit="fill"
            />
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
