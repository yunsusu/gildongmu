import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import Checkbox from "@/components/detail/secretCheckbox";
import WriterTag from "@/components/detail/tag";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postCommentOfComment } from "@/lib/api/detail";

export default function RegistCommentOfComment({
  data,
  user,
  cardId,
  setShowReply,
}: {
  data: any;
  user: any;
  cardId: number;
  setShowReply: any;
}) {
  const [comment, setComment] = useState("");
  const [secret, setSecret] = useState(false);
  const maxLength = 100;
  const charCount = comment.length;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({
      postid,
      commentText,
      commentSecret,
      commentParentId,
    }: any) =>
      postCommentOfComment(postid, commentText, commentSecret, commentParentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", cardId],
      });
      setShowReply(false);
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
      commentParentId: data.id,
    });
  };

  const secretToggle = () => {
    setSecret(!secret);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-start gap-12 rounded-12 bg-bg-02 px-20 py-16"
    >
      <div className="relative h-32 w-24">
        <Image src="/icons/frame.svg" alt="대댓글 이미지" fill />
      </div>
      <div className="flex w-full flex-col items-start gap-12 self-stretch">
        <div className="flex items-center justify-between self-stretch py-2">
          <div className="flex items-center gap-12">
            <div className="relative h-32 w-32 rounded-full tablet:h-24 tablet:w-24">
              <Image
                src={
                  user?.profilePath
                    ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${user.profilePath}`
                    : "/icons/defaultProfile.png"
                }
                alt="댓글 작성자 이미지"
                fill
              />
            </div>
            <span className="text-18 leading-[27px] tracking-[-0.6px] text-text-01 tablet:text-16 tablet:leading-[20.8px]">
              {user?.nickname}
            </span>
            {data.owner && <WriterTag />}
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 self-stretch overflow-auto">
          <Textarea
            value={comment}
            onChange={handleInputChange}
            className="h-120 w-full resize-none rounded-12 border border-line-02 bg-white p-16 placeholder:text-ellipsis placeholder:text-16 placeholder:font-normal placeholder:text-text-02 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="답글을 작성해 주세요."
            maxLength={200}
          />
          <div className="flex w-full justify-between">
            <Checkbox secretToggle={secretToggle} />
            <span className="bottom-3 right-3 text-sm text-gray-600">{`${charCount}/${maxLength}`}</span>
          </div>
        </div>
        <div className="flex items-center justify-end self-stretch">
          <Button
            type="submit"
            variant={"outline"}
            className="h-36 w-83 rounded-32"
          >
            <span className="text-14 font-extrabold leading-5">등록하기</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
