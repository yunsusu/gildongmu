import Image from "next/image";
import { useState } from "react";

import RegistCommentOfComment from "@/components/detail/article/contents/comments/register/commentOfcomment";
import { Button } from "@/components/ui/button";

export default function OthersComment() {
  const [showReply, setShowReply] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const toggleReply = () => {
    if (showReply) {
      setAnimationClass("animate-fade-out-down");
      setTimeout(() => {
        setShowReply(false);
        setAnimationClass("");
      }, 500);
    } else {
      setShowReply(true);
      setAnimationClass("animate-fade-down");
    }
  };
  return (
    <>
      <div className="flex flex-col items-start gap-8 self-stretch">
        <div className="flex items-center self-stretch py-2">
          <div className="flex items-center gap-12">
            <div className="relative h-32 w-32 rounded-full tablet:h-24 tablet:w-24">
              <Image
                src={
                  "https://i.namu.wiki/i/6b7_BVyszfYCyjDtIPE8tJK56XutqfO28xp9KdjZ8tXMP1JCmcYei0IN5vbAJ5JF2t3u4TxwsUrQew6xWfvWgg.webp"
                }
                alt="댓글 작성자 이미지"
                fill
              />
            </div>
            <span className="text-18 leading-[27px] tracking-[-0.6px] text-text-01 tablet:text-16 tablet:leading-[20.8px]">
              {"비챤"}
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
        <Button
          variant={"outline"}
          className="h-36 w-72 rounded-lg"
          onClick={toggleReply}
        >
          <span className="text-14 font-extrabold leading-5">답글</span>
        </Button>
        {showReply && (
          <div className={`${animationClass} w-full`}>
            <RegistCommentOfComment />
          </div>
        )}
      </div>
      <div className="h-[1px] self-stretch bg-sky-200"></div>
    </>
  );
}
