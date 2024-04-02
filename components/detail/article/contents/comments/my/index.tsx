import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import EditComment from "@/components/detail/article/contents/comments/my/edit";
import CommentOfComment from "@/components/detail/article/contents/comments/others/commentOfcomment";
import RegistCommentOfComment from "@/components/detail/article/contents/comments/register/commentOfcomment";
import WriterTag from "@/components/detail/tag";
import Dropdown from "@/components/dropdown";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { deleteComment } from "@/lib/api/detail";

export default function MyComment({ data, user, cardId }: any) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [contentEdit, setContentEdit] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [dropDown, setDropDown, handleDropDown] = useToggle();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ postid, commentId }: any) =>
      deleteComment(postid, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentList"],
      });
    },
  });

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

  const commentDelete = () => {
    mutate({ postid: cardId, commentId: data.id });
  };

  const edit = [
    { name: "수정하기", handleBtn: () => setContentEdit(prev => !prev) },
    { name: "삭제하기", handleBtn: () => setIsDeleteModalOpen(true) },
  ];

  const commentOfcomment = data.children;

  return (
    <>
      {contentEdit ? (
        <EditComment
          data={data}
          user={user}
          cardId={cardId}
          setContentEdit={setContentEdit}
        />
      ) : (
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex items-center justify-between self-stretch py-2">
            <div className="flex items-center gap-12">
              <div className="relative h-32 w-32 rounded-full tablet:h-24 tablet:w-24">
                <Image
                  src={
                    user?.profilePath
                      ? user.profilePath
                      : "/icons/defaultProfile.png"
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
              {data.owner && <WriterTag />}
            </div>
            <div ref={ref} className="relative">
              <div
                className="relative h-24 w-24 cursor-pointer rounded-full mobile:h-20 mobile:w-20"
                onClick={handleDropDown}
              >
                <Image
                  src={"/icons/more_vertical.svg"}
                  alt="케밥 이미지"
                  fill
                />
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
      )}
      {commentOfcomment?.map((item: any) => (
        <CommentOfComment
          key={item.id}
          data={item}
          user={user}
          cardId={cardId}
        />
      ))}
      <div className="h-[1px] self-stretch bg-sky-200"></div>
      {isDeleteModalOpen && (
        <Modal
          modalType="deleteComment"
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onApprove={() => {
            commentDelete();
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </>
  );
}
