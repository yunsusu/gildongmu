import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Card() {
  const [gather, setGather] = useState(false);
  return (
    <Link
      href={"/"}
      className="w-max h-[310px] block bg-white rounded-14 border border-line-02 m-auto"
    >
      <div className="tablex:w-196 mobile:w-312 w-240 h-180 p-16 tablet:p-12 flex flex-col rounded-16 relative overflow-hidden border">
        <Image
          src={"/images/logo.svg"}
          alt="여행지 이미지"
          fill
          className="z-0 object-cover"
        />
        <div className="bg-black w-full h-full absolute left-0 top-0 opacity-20"></div>
        <div className="w-full relative z-1">
          {gather ? (
            <div className="w-max py-5 tablet:py-3 px-12 tablet:px-10 bg-stone-100 rounded-24 text-14 tablet:text-12 text-stone-500">
              모집 완료
            </div>
          ) : (
            <div className="w-max py-5 tablet:py-3 px-12 tablet:px-10 bg-pink-100 rounded-24 text-14 tablet:text-12 text-pink-500">
              모집 중
            </div>
          )}
          <div className="text-16 tablet:text-14 text-white mt-16 leading-tight">
            길동무 모집글 제목길동무 모집글 제목길동
          </div>
          <div className="text-14 text-white mt-1">작성자</div>
        </div>
      </div>

      <div className="w-full h-130 p-16 tablet:p-12 flex flex-col text-14 text-text-02">
        <div className="flex-1 flex items-center gap-8">
          <div className="relative w-16 h-16 tablet:w-12 tablet:h-12">
            <Image src={"/icons/location.svg"} alt="위치" fill />
          </div>
          <div>한국, 제주특별자치도</div>
        </div>

        <div className="flex-1 flex items-center gap-8">
          <div className="relative w-16 h-16 tablet:w-12 tablet:h-12">
            <Image src={"/icons/calendar.svg"} alt="일정" fill />
          </div>
          <div>2024/03/10-2024/03/14</div>
        </div>

        <div className="flex-1 flex items-center gap-8">
          <div className="relative w-16 h-16 tablet:w-12 tablet:h-12">
            <Image src={"/icons/tag.svg"} alt="태그" fill />
          </div>
          <div>야돈만</div>
        </div>

        <div className="flex-1 flex gap-12 text-12">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image src={"/icons/heart.svg"} alt="좋아요 수" fill />
            </div>
            <div>00</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image src={"/icons/comment.svg"} alt="댓글 수" fill />
            </div>
            <div>00</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
