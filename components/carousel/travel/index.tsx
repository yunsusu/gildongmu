import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import Slider from "react-slick";

import Card from "@/components/card";
import useToggle from "@/hooks/useToggle";
import { getTravelCard } from "@/lib/api/travel";

function SampleNextArrow(props: { className: any; style: any; onClick: any }) {
  const [isMobile, setIsMobile] = useToggle(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: "flex",
        content: "none",
        width: "52px",
        height: "52px",
        padding: "10px",
        border: "1.5px solid #14b8a6",
        borderRadius: "32px",
        background: "#fff",
        justifyContent: "center",
        alignItems: "center",
        transform: isMobile ? "translate(25px,-50%)" : "translate(35px,-50%)",
      }}
    >
      <div className="relative h-29 w-29">
        <Image
          className="-translate-y-20"
          src="icons/arrow_right.svg"
          alt="캐러셀다음버튼"
          fill
        />
      </div>
    </div>
  );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any }) {
  const { className, onClick } = props;

  const [isMobile, setIsMobile] = useToggle(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: "flex",
        content: "none",
        width: "52px",
        height: "52px",
        padding: "10px",
        border: "1.5px solid #14b8a6",
        borderRadius: "32px",
        background: "#fff",
        justifyContent: "center",
        alignItems: "center",
        transform: isMobile ? "translate(-25px,-50%)" : "translate(-35px,-50%)",
        zIndex: 1,
      }}
    >
      <div className="relative h-29 w-29">
        <Image
          className="-translate-y-20"
          src="icons/arrow_left.svg"
          alt="캐러셀이전버튼"
          fill
        />
      </div>
    </div>
  );
}

function TravelCarousel({ choice }: any) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: (
      <SampleNextArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
  console.log(choice);
  const { data: card } = useQuery({
    queryKey: ["cards", choice],
    queryFn: () => getTravelCard(0, 12, choice),
  });

  return (
    <div className="slider-container my-custom-slider relative">
      <Slider {...settings}>
        {Array.isArray(card?.content)
          ? card?.content.map((item: any, index: number) => (
              <Card key={index} content={item} />
            ))
          : null}
      </Slider>
    </div>
  );
}

export default TravelCarousel;
