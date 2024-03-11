import Image from "next/image";
import { useState } from "react";

function Card() {
  const [gather, setGather] = useState(true);
  return (
    <div className="w-240 h-[310px]">
      <div className="w-240 h-180 p-16 flex flex-col rounded-16 relative overflow-hidden border">
        <Image
          src={"/images/logo.png"}
          alt="여행지 이미지"
          fill
          className="z-0"
        />
        <div className="w-full relative z-1">
          {gather ? (
            <div className="w-max py-5 px-12 bg-stone-100 rounded-24 text-14 text-stone-500">
              모집 완료
            </div>
          ) : (
            <div className="w-max py-5 px-12 bg-pink-100 rounded-24 text-14 text-pink-500">
              모집 중
            </div>
          )}
          <div>길동무 모집글 제목길동무 모집글 제목길동</div>
          <div>작성자</div>
        </div>
      </div>
      <div className="w-full h-130 rounded-16 bg-slate-500 pt-16">sdf</div>
    </div>
  );
}

export default Card;
