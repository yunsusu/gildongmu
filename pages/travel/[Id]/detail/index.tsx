import Image from "next/image";
import React from "react";

import Article from "@/components/detail/article";
import Header from "@/components/detail/header/index";
import Title from "@/components/detail/title";

function Detail() {
  return (
    <div className="w-1200 flex flex-col bg-sky-50">
      <Header />
      <Title />
      <Article />
      <div
        className="fixed bottom-40 right-40 h-64 w-64 animate-bounce cursor-pointer"
        onClick={scrollToTop}
      >
        <Image src="/icons/rocket.svg" alt="로켓 이미지" fill />
      </div>
    </div>
  );
}

export default Detail;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
