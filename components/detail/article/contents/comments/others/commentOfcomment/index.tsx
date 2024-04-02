import Image from "next/image";
import { useState } from "react";

import RegistCommentOfComment from "@/components/detail/article/contents/comments/register/commentOfcomment";
import WriterTag from "@/components/detail/tag";
import { Button } from "@/components/ui/button";

export default function OthersCommentOfComment({ data, user, cardId }: any) {
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
      <div className="flex w-full items-start gap-12 rounded-12 bg-bg-02 px-20 py-16">
        <div className="relative h-32 w-24">
          <Image src="/icons/frame.svg" alt="대댓글 이미지" fill />
        </div>
        <div className="flex w-full flex-col items-start gap-12 self-stretch">
          <div className="flex items-center justify-between self-stretch py-2">
            <div className="flex items-center gap-12">
              {data.owner && (
                <div className="relative h-32 w-32 rounded-full tablet:h-24 tablet:w-24">
                  <Image
                    src={
                      "https://i.namu.wiki/i/x0p4O-TMPuCvZmIwxa2wDiSnePtAueSz5hHqEK1_f_2zU9btj3q2ORRvnzc6yqOnZIU-tB7im9pntDXUpPZyNg.webp"
                    }
                    alt="댓글 작성자 이미지"
                    fill
                  />
                </div>
              )}
              <span className="text-18 leading-[27px] tracking-[-0.6px] text-text-01 tablet:text-16 tablet:leading-[20.8px]">
                {data.nickname}
              </span>
              {data.secret && (
                <div className="relative h-20 w-20">
                  <Image src="/icons/lock.svg" alt="자물쇠 이미지" fill />
                </div>
              )}
              {user?.id === cardId && <WriterTag />}
            </div>
          </div>
          <div className="flex items-start gap-8 self-stretch py-12">
            <span className="text-16 font-normal not-italic leading-[20.8px] tracking-[-0.6px] text-text-02">
              {data.content}
            </span>
          </div>
          <div className="flex items-center justify-between self-stretch">
            <Button
              variant={"outline"}
              className="h-36 w-72 rounded-lg"
              onClick={toggleReply}
            >
              <span className="text-14 font-extrabold leading-5">답글</span>
            </Button>
          </div>
        </div>
      </div>
      {showReply && (
        <div className={`${animationClass} w-full`}>
          <RegistCommentOfComment data={data} user={user} cardId={cardId} />
        </div>
      )}
    </>
  );
}
