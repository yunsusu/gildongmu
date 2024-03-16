import Image from "next/image";
import React, { useState } from "react";

import Checkbox from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Detail() {
  return (
    <div className="w-1200 flex flex-col bg-sky-50">
      <Header />
      <Article />
    </div>
  );
}

export default Detail;

function Header() {
  return (
    <div className="flex w-full justify-between gap-10 px-10 py-24">
      <div className="relative flex h-48 w-48 items-center justify-center gap-10 p-8">
        <Image src="/icons/chevron_left.svg" alt="왼쪽 화살표 이미지" fill />
      </div>
      <div className="max-w-1036 flex h-48 text-center">
        <span className="text-32 font-extrabold leading-[48px] tracking-[0.6px] text-text-01">
          상세보기
        </span>
      </div>
      <div className="relative flex h-48 w-48 items-center justify-center gap-10 p-8"></div>
    </div>
  );
}

function Article() {
  return (
    <div className="self flex w-full flex-col items-center gap-24 self-stretch pb-80">
      <Title />
      <Content />
    </div>
  );
}

function Title() {
  return (
    <div className="flex w-[956px] flex-col items-start gap-40 px-24 py-32"></div>
  );
}

function Content() {
  // 현재 선택된 content의 id를 상태로 관리
  const [selectedId, setSelectedId] = useState("information");

  const handleClick =
    (id: string) => (event: { preventDefault: () => void }) => {
      event.preventDefault();
      setSelectedId(id); // 선택된 id를 상태로 설정
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

  // 선택된 링크에 따라 스타일을 결정하는 함수
  const getLinkStyle = (id: string) => ({
    background: selectedId === id ? "white" : "#e0f2fe",
  });
  return (
    <div className="flex w-[956px] flex-col items-center">
      <div className="flex w-full items-start gap-4 text-20 font-bold text-sky-600">
        <a
          className="flex h-60 w-1/3 justify-around rounded-tl-32 rounded-tr-32 border-none"
          href="#information"
          onClick={handleClick("information")}
          style={getLinkStyle("information")}
        >
          <span className="flex items-center">모집정보</span>
        </a>
        <a
          className="flex h-60 w-1/3 justify-around rounded-tl-32 rounded-tr-32 border-none"
          href="#destination"
          onClick={handleClick("destination")}
          style={getLinkStyle("destination")}
        >
          <span className="flex items-center">여행지</span>
        </a>
        <a
          className="flex h-60 w-1/3 justify-around rounded-tl-32 rounded-tr-32 border-none"
          href="#comment"
          onClick={handleClick("comment")}
          style={getLinkStyle("comment")}
        >
          <span className="flex items-center">댓글</span>
        </a>
      </div>
      <div className="flex w-full flex-col items-start gap-60 rounded-bl-32 rounded-br-32 bg-white px-32 pb-80 pt-32 text-20 font-bold">
        <Recruitment />
        <Images />
        <Destination />
        <Comment />
      </div>
    </div>
  );
}

function Recruitment() {
  const tags = ["태그1", "태그2", "태그3"];
  return (
    <div
      id="information"
      className="flex w-full flex-col items-start gap-32 self-stretch"
    >
      <span>모집 정보</span>
      <div className="flex flex-col items-start gap-24 self-stretch text-16 font-normal">
        <div className="flex flex-col items-start gap-16 self-stretch">
          <div className="flex items-center gap-12 self-stretch">
            <div className="relative h-24 w-24">
              <Image src="/icons/calendar.svg" alt="달력 이미지" fill />
            </div>
            <span>2024/02/29 - 2024/04/08</span>
          </div>
          <div className="flex items-center gap-12 self-stretch">
            <div className="relative h-24 w-24">
              <Image src="/icons/profile.svg" alt="달력 이미지" fill />
            </div>
            <span>nn 명</span>
          </div>
          <div className="flex items-center gap-12 self-stretch">
            <div className="relative h-24 w-24">
              <Image src="/icons/tag.svg" alt="달력 이미지" fill />
            </div>
            <span>남여 상관없음</span>
          </div>
        </div>
        <div className="flex items-start gap-8 self-stretch">
          <div className="h-[211px] w-full resize-none rounded-12 border border-line-02 bg-bg-02 px-16 py-16 placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 tablet:h-[214px]">
            {"모집 내용 적힌 부분"}
          </div>
        </div>
        <div className="flex items-start gap-12">
          <span className="flex h-34 items-center gap-5 rounded-24 bg-tag-orange-100 px-13 py-5 text-16 text-tag-orange-500 mobile:h-28 mobile:text-14">
            {tags[0]}
          </span>
          <span className="flex h-34 items-center gap-5 rounded-24 bg-tag-blue-100 px-13 py-5 text-16 text-tag-blue-500 mobile:h-28 mobile:text-14">
            {tags[1]}
          </span>
          <span className="flex h-34 items-center gap-5 rounded-24 bg-tag-pink-100 px-13 py-5 text-16 text-tag-pink-500 mobile:h-28 mobile:text-14">
            {tags[2]}
          </span>
        </div>
      </div>
    </div>
  );
}

function Images() {
  const travelImg = [
    "https://i.namu.wiki/i/5i-kQ5O71eVdYRGVSfquZF5NmnBYYRNcK9bFMq-CD9OI5L-faMaFykGuua7N11FgAuTwiW8vlDrNlK9Yx8TGrA.webp",
    "https://i.namu.wiki/i/x0p4O-TMPuCvZmIwxa2wDiSnePtAueSz5hHqEK1_f_2zU9btj3q2ORRvnzc6yqOnZIU-tB7im9pntDXUpPZyNg.webp",
    "https://i.namu.wiki/i/lehvCgtieC9kaIC3CNctRUbdzZ7kT8JRqV7pJnCRa-9JrALleJL-U2FDineBXIpC5aW1U9EwVUmiVLM36mOeKA.webp",
    "https://i.namu.wiki/i/6b7_BVyszfYCyjDtIPE8tJK56XutqfO28xp9KdjZ8tXMP1JCmcYei0IN5vbAJ5JF2t3u4TxwsUrQew6xWfvWgg.webp",
    "https://i.namu.wiki/i/TEuCm3eTFA1nZ5yiaLN5Nyc12ylXwE7tdGqNwd8D5rPJuoOfwYoGsEYsasuu7nXGK7tSp66whtKnfqcLpR5R5A.webp",
    "https://i.namu.wiki/i/dCjb4uiGR2sCTd6AjNMLl8Oq7iN-k2ki8dqbPjERx4M0nOJBbq2pEieR7x8YbcOOWTqsCYeRFeAYUrazr2JiTg.webp",
  ];
  return (
    <div className="flex w-full flex-col items-start gap-32 self-stretch">
      <span>이미지</span>
      <div className="flex flex-wrap gap-24">
        {travelImg.map((img, index) => (
          <div key={index} className="relative h-[281px] w-[281px]">
            <Image className="rounded-16" src={img} alt="여행지 이미지" fill />
          </div>
        ))}
      </div>
    </div>
  );
}

function Destination() {
  return (
    <div
      id="destination"
      className="flex w-full flex-col items-start gap-32 self-stretch"
    >
      <span>여행지</span>
      <div className="flex flex-col items-start gap-16 self-stretch">
        <div className="flex items-center gap-12">
          <div className="relative h-24 w-24">
            <Image src="/icons/location_red.svg" alt="장소 표시 이미지" fill />
          </div>
          <span className="text-16 font-bold leading-[20.8px]">
            {"영국, 런던"}
          </span>
        </div>
        <div className="relative h-[500px] w-[892px]">
          <Image
            className="rounded-16"
            src="https://i.namu.wiki/i/EchoVcoRKArNn17MtwKZP5ZS2aJdhC5_S5mpoowWd3mdsvM-L0IC-nsITZqO1aW4a2g8FhP0QE7WBI41WEserhGZurYc5PPRt1Nl07mB40rxoUXO66P95Op0p8i0i4QIxQ4y50YbfRudX1k47GW75g.webp"
            alt="여행 지도 이미지"
            fill
          />
        </div>
      </div>
    </div>
  );
}

function Comment() {
  return (
    <div
      id="comment"
      className="flex w-full flex-col items-start gap-32 self-stretch"
    >
      <span>댓글</span>
      <div className="flex w-full flex-col items-start gap-40 self-stretch">
        <div className="flex w-full flex-col items-start gap-20 self-stretch">
          {<OthersComment />}
          <SecretCommment />
          <MyComment />
          <RegisterCommnet />
        </div>
      </div>
    </div>
  );
}

function OthersComment() {
  return (
    <>
      <div className="flex flex-col items-start gap-8 self-stretch">
        <div className="flex items-center self-stretch py-2">
          <div className="flex items-center gap-12">
            <div className="relative h-32 w-32 rounded-full">
              <Image
                src={
                  "https://i.namu.wiki/i/5i-kQ5O71eVdYRGVSfquZF5NmnBYYRNcK9bFMq-CD9OI5L-faMaFykGuua7N11FgAuTwiW8vlDrNlK9Yx8TGrA.webp"
                }
                alt="댓글 작성자 이미지"
                fill
              />
            </div>
            <span className="text-18 leading-[27px] tracking-[-0.6px] text-text-01">
              {"유저 이름"}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-8 self-stretch overflow-auto py-12">
          <span className="text-16 font-normal leading-6 tracking-[-0.6px]">
            {
              "댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용"
            }
          </span>
        </div>
        <Button variant={"outline"} className="h-36 w-72 rounded-lg">
          <span className="text-14 font-extrabold leading-5">답글</span>
        </Button>
      </div>
      <div className="h-[1px] self-stretch bg-sky-200"></div>
    </>
  );
}

function MyComment() {
  return (
    <>
      <div className="flex flex-col items-start gap-8 self-stretch">
        <div className="flex items-center justify-between self-stretch py-2">
          <div className="flex items-center gap-12">
            <div className="relative h-32 w-32 rounded-full">
              <Image
                src={
                  "https://i.namu.wiki/i/5i-kQ5O71eVdYRGVSfquZF5NmnBYYRNcK9bFMq-CD9OI5L-faMaFykGuua7N11FgAuTwiW8vlDrNlK9Yx8TGrA.webp"
                }
                alt="댓글 작성자 이미지"
                fill
              />
            </div>
            <span className="text-18 leading-[27px] tracking-[-0.6px] text-text-01">
              {"내 닉네임"}
            </span>
            <div className="relative h-20 w-20">
              <Image src="/icons/lock.svg" alt="자물쇠 이미지" fill />
            </div>
          </div>
          <div className="relative h-24 w-24 rounded-full">
            <Image src={"/icons/more_vertical.svg"} alt="케밥 이미지" fill />
          </div>
        </div>
        <div className="flex items-start gap-8 self-stretch overflow-auto py-12">
          <span className="text-16 font-normal leading-6 tracking-[-0.6px]">
            {
              "댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용"
            }
          </span>
        </div>
        <Button variant={"outline"} className="h-36 w-72 rounded-lg">
          <span className="text-14 font-extrabold leading-5">답글</span>
        </Button>
      </div>
      <div
        className="h-[1px] self-stretch"
        style={{ borderTop: "1px dashed #7DD3FC" }}
      ></div>
    </>
  );
}

//TODO: 필요한지 논의
function SecretCommment() {
  return (
    <>
      <div className="flex items-start gap-8 self-stretch py-12">
        <span className="overflow-hidden text-ellipsis text-16 font-normal leading-6 tracking-[-0.6px] text-text-02">
          비밀 댓글입니다.
        </span>
      </div>
      <div className="h-[1px] self-stretch bg-sky-200"></div>
    </>
  );
}

function RegisterCommnet() {
  return (
    <div className="flex flex-col items-start gap-12 self-stretch">
      <div className="flex items-center self-stretch py-2">
        <div className="flex items-center gap-12">
          <div className="relative h-32 w-32 rounded-full">
            <Image
              src={
                "https://i.namu.wiki/i/5i-kQ5O71eVdYRGVSfquZF5NmnBYYRNcK9bFMq-CD9OI5L-faMaFykGuua7N11FgAuTwiW8vlDrNlK9Yx8TGrA.webp"
              }
              alt="댓글 작성자 이미지"
              fill
            />
          </div>
          <span className="text-18 leading-[27px] tracking-[-0.6px] text-text-01">
            {"내 닉네임"}
          </span>
        </div>
      </div>
      <div className="flex items-start self-stretch overflow-auto">
        <Textarea
          className="h-120 w-full resize-none rounded-12 border border-line-02 bg-bg-02 p-16 placeholder:text-ellipsis placeholder:text-16 placeholder:font-normal placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="댓글을 작성해 주세요."
        />
      </div>
      <div className="flex items-center justify-between self-stretch">
        <Checkbox />
        <Button variant={"outline"} className="h-36 w-83 rounded-32">
          <span className="text-14 font-extrabold leading-5">등록하기</span>
        </Button>
      </div>
    </div>
  );
}
