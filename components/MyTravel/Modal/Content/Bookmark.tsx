import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "@/lib/api/axios";
import { deleteBookMarks } from "@/lib/api/bookmarks";

export default function BookmarkContent({ data, onClose }: any) {
  const postid = data.id;

  const queryClient = useQueryClient();

  const removeBookmark = useMutation({
    mutationFn: deleteBookMarks,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const travelApply = useMutation({
    mutationFn: () => axios.post(`/posts/${data.id}/participants`),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return (
    <div className="mt-20 flex w-full items-center justify-center gap-20 tablet:mt-16 mobile:mt-12 mobile:gap-12">
      <button
        className="flex h-52 w-180 items-center justify-center rounded-12 border-[1.5px] border-primary font-bold leading-[22px] text-primary hover:border-primary-press hover:text-primary-press mobile:h-44 mobile:w-90 mobile:text-16"
        onClick={e => {
          e.stopPropagation();
          removeBookmark.mutate(postid);
          onClose();
        }}
      >
        찜 취소
      </button>
      <button
        className={`flex h-52 w-full items-center justify-center ${(data.status === "모집 완료" || data.myPost) && "cursor-not-allowed bg-stone-200 text-[#737373] hover:bg-stone-200 hover:text-[#737373]"} rounded-12 bg-primary font-bold leading-[22px] text-white hover:bg-primary-press mobile:h-44 mobile:text-16`}
        onClick={e => {
          e.stopPropagation();
          if (data.status !== "모집 완료") {
            travelApply.mutate();
            onClose();
          }
        }}
      >
        길동무 신청하기
      </button>
    </div>
  );
}
