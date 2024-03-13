import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function SampleNextArrow(props: { className: any; style: any; onClick: any }) {
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
      }}
    >
      <Image
        className="-translate-y-20"
        src="icons/arrow_right.svg"
        alt="캐러셀다음버튼"
        width={32}
        height={32}
        objectFit="fill"
      />
    </div>
  );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any }) {
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
        zIndex: 1,
      }}
    >
      <Image
        className="-translate-y-20"
        src="icons/arrow_left.svg"
        alt="캐러셀이전버튼"
        width={32}
        height={32}
        objectFit="fill"
      />
    </div>
  );
}

function Responsive() {
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
  return (
    <div className="slider-container my-custom-slider">
      <Slider {...settings}>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>1</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>2</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>3</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>4</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>5</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>6</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>7</h3>
        </div>
        <div className="flex w-40 h-40 border-2 border-black">
          <h3>8</h3>
        </div>
      </Slider>
    </div>
  );
}

export default Responsive;
