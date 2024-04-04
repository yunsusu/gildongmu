import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import Checkbox from "@/components/detail/secretCheckbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { postComment } from "@/lib/api/detail/index";
import { DetailDataType } from "@/lib/api/detail/type";

export default function RegisterComment({
  data,
  user,
}: {
  data: DetailDataType;
  user: any;
}) {
  const [comment, setComment] = useState("");
  const [secret, setSecret] = useState(false);
  const maxLength = 100;
  const charCount = comment.length;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ postid, commentText, commentSecret }: any) =>
      postComment(postid, commentText, commentSecret),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", data?.id],
      });
      setComment("");
    },
  });

  const handleInputChange = (e: any) => {
    if (e.target.value.length <= maxLength) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    mutate({ postid: data.id, commentText: comment, commentSecret: secret });
  };

  const secretToggle = () => {
    setSecret(!secret);
  };
  return (
    <div className="flex flex-col items-start gap-12 self-stretch">
      <div className="flex items-center self-stretch py-2">
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
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-12">
        <div className="flex flex-col items-end gap-4 self-stretch overflow-auto">
          <Textarea
            value={comment}
            onChange={handleInputChange}
            className="h-120 w-full resize-none rounded-12 border border-line-02 bg-bg-02 p-16 placeholder:text-ellipsis placeholder:text-16 placeholder:font-normal placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="댓글을 작성해 주세요."
            maxLength={100}
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
      </form>
    </div>
  );
}
