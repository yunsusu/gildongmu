import Image from "next/image";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import CommentOfComment from "@/components/detail/article/contents/comments/others/commentOfcomment";
import RegistCommentOfComment from "@/components/detail/article/contents/comments/register/commentOfcomment";
import WriterTag from "@/components/detail/tag";
import Dropdown from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";

export default function MyComment({ data, user, cardId }: any) {
  const [showReply, setShowReply] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [dropDown, setDropDown, handleDropDown] = useToggle();

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    dropDown && handleDropDown();
  });

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

  const edit = [
    { name: "수정하기", handleBtn: () => {} },
    { name: "삭제하기", handleBtn: () => {} },
  ];

  const commentOfcomment = data.children;

  return (
    <>
      <div className="flex flex-col items-start gap-8 self-stretch">
        <div className="flex items-center justify-between self-stretch py-2">
          <div className="flex items-center gap-12">
            <div className="relative h-32 w-32 rounded-full tablet:h-24 tablet:w-24">
              <Image
                src={
                  "https://i.namu.wiki/i/5i-kQ5O71eVdYRGVSfquZF5NmnBYYRNcK9bFMq-CD9OI5L-faMaFykGuua7N11FgAuTwiW8vlDrNlK9Yx8TGrA.webp"
                }
                alt="댓글 작성자 이미지"
                fill
              />
            </div>
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
          <div ref={ref} className="relative">
            <div
              className="relative h-24 w-24 cursor-pointer rounded-full mobile:h-20 mobile:w-20"
              onClick={handleDropDown}
            >
              <Image src={"/icons/more_vertical.svg"} alt="케밥 이미지" fill />
            </div>
            {dropDown && (
              <Dropdown buttons={edit} handleDropDown={handleDropDown} />
            )}
          </div>
        </div>
        <div className="flex items-start gap-8 self-stretch overflow-auto py-12">
          <span className="text-16 font-normal leading-6 tracking-[-0.6px]">
            {data.content}
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
            <RegistCommentOfComment data={data} user={user} cardId={cardId} />
          </div>
        )}
      </div>
      {commentOfcomment?.map((item: any) => (
        <CommentOfComment
          key={item.id}
          data={item}
          user={user}
          cardId={cardId}
        />
      ))}
      <div className="h-[1px] self-stretch bg-sky-200"></div>
    </>
  );
}
