import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import Checkbox from "@/components/detail/secretCheckbox";
import WriterTag from "@/components/detail/tag";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { editComment } from "@/lib/api/detail/index";
import { DetailDataType } from "@/lib/api/detail/type";

export default function EditComment({
  data,
  user,
  cardId,
  setContentEdit,
}: {
  data: DetailDataType;
  user: any;
  cardId: number;
  setContentEdit: any;
}) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [comment, setComment] = useState(data.content || "");
  const [secret, setSecret] = useState(false);
  const maxLength = 100;
  const charCount = comment.length;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ postid, commentText, commentSecret, commentId }: any) =>
      editComment(postid, commentText, commentSecret, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", cardId],
      });
      setContentEdit(false);
    },
  });

  const handleInputChange = (e: any) => {
    if (e.target.value.length <= maxLength) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    mutate({
      postid: cardId,
      commentText: comment,
      commentSecret: secret,
      commentId: data.id,
    });
  };

  const secretToggle = () => {
    setSecret(!secret);
  };

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-12 self-stretch">
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
              {user?.nickname}
            </span>
            {data.secret && (
              <div className="relative h-20 w-20">
                <Image src="/icons/lock.svg" alt="자물쇠 이미지" fill />
              </div>
            )}
            {user?.id === cardId && <WriterTag />}
          </div>
          <div
            onClick={openCancelModal}
            className="relative h-24 w-24 cursor-pointer mobile:h-20 mobile:w-20"
          >
            <Image src="/icons/cancel_white.svg" alt="닫기 버튼 이미지" fill />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-12">
          <div className="flex flex-col items-end gap-4 self-stretch overflow-auto">
            <Textarea
              value={comment}
              onChange={handleInputChange}
              className="h-120 w-full resize-none rounded-12 border border-line-02 bg-white p-16 placeholder:text-ellipsis placeholder:text-16 placeholder:font-normal placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
              maxLength={100}
            />
            <span className="bottom-3 right-3 text-sm text-gray-600">{`${charCount}/${maxLength}`}</span>
          </div>
          <div className="flex items-center justify-between self-stretch">
            <Checkbox secretToggle={secretToggle} />
            <Button
              type="submit"
              variant={"outline"}
              className="h-36 w-83 rounded-32"
            >
              <span className="text-14 font-extrabold leading-5">수정하기</span>
            </Button>
          </div>
        </form>
      </div>
      {isCancelModalOpen && (
        <Modal
          modalType="cancelEditing"
          onClose={() => {
            setIsCancelModalOpen(false);
          }}
          onCancel={() => {
            setIsCancelModalOpen(false);
          }}
          onConfirm={() => {
            setIsCancelModalOpen(false);
            setContentEdit(false);
          }}
        />
      )}
    </>
  );
}
