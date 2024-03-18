import Image from "next/image";
import { useState } from "react";

import Checkbox from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function RegisterComment() {
  const [comment, setComment] = useState("");
  const maxLength = 100;
  const charCount = comment.length;

  const handleInputChange = (e: any) => {
    if (e.target.value.length <= maxLength) {
      setComment(e.target.value);
    }
  };
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
      <div className="flex flex-col items-end gap-4 self-stretch overflow-auto">
        <Textarea
          value={comment}
          onChange={handleInputChange}
          className="h-120 w-full resize-none rounded-12 border border-line-02 bg-bg-02 p-16 placeholder:text-ellipsis placeholder:text-16 placeholder:font-normal placeholder:text-text-05 focus:border focus:border-line-01 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="댓글을 작성해 주세요."
          maxLength={200}
        />
        <span className="bottom-3 right-3 text-sm text-gray-600">{`${charCount}/${maxLength}`}</span>
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
