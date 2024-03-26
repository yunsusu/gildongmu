import Image from "next/image";

export default function Images() {
  const travelImg = [
    "https://i.namu.wiki/i/5i-kQ5O71eVdYRGVSfquZF5NmnBYYRNcK9bFMq-CD9OI5L-faMaFykGuua7N11FgAuTwiW8vlDrNlK9Yx8TGrA.webp",
    "https://i.namu.wiki/i/x0p4O-TMPuCvZmIwxa2wDiSnePtAueSz5hHqEK1_f_2zU9btj3q2ORRvnzc6yqOnZIU-tB7im9pntDXUpPZyNg.webp",
    "https://i.namu.wiki/i/lehvCgtieC9kaIC3CNctRUbdzZ7kT8JRqV7pJnCRa-9JrALleJL-U2FDineBXIpC5aW1U9EwVUmiVLM36mOeKA.webp",
    "https://i.namu.wiki/i/6b7_BVyszfYCyjDtIPE8tJK56XutqfO28xp9KdjZ8tXMP1JCmcYei0IN5vbAJ5JF2t3u4TxwsUrQew6xWfvWgg.webp",
    "https://i.namu.wiki/i/TEuCm3eTFA1nZ5yiaLN5Nyc12ylXwE7tdGqNwd8D5rPJuoOfwYoGsEYsasuu7nXGK7tSp66whtKnfqcLpR5R5A.webp",
    "https://i.namu.wiki/i/dCjb4uiGR2sCTd6AjNMLl8Oq7iN-k2ki8dqbPjERx4M0nOJBbq2pEieR7x8YbcOOWTqsCYeRFeAYUrazr2JiTg.webp",
  ];
  return (
    <div className="flex w-full flex-col items-start gap-32 self-stretch tablet:gap-24">
      <span className="text-20 tablet:text-18">이미지</span>
      <div className="flex w-full flex-wrap gap-24 tablet:gap-20 mobile:gap-12">
        {travelImg.map((img, index) => (
          <div
            key={index}
            className="relative h-[281px] w-[281px] tablet:h-[210px] tablet:w-[210px] mobile:h-[130px] mobile:w-[130px]"
          >
            <Image className="rounded-16" src={img} alt="여행지 이미지" fill />
          </div>
        ))}
      </div>
    </div>
  );
}
