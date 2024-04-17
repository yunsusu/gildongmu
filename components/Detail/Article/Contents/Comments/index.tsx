import { useQuery } from "@tanstack/react-query";

import MyComment from "@/components/Detail/Article/Contents/Comments/My";
import OthersComment from "@/components/Detail/Article/Contents/Comments/Others";
import RegisterComment from "@/components/Detail/Article/Contents/Comments/Register";
import { getCommentList } from "@/lib/api/detail";
import { CommentProps } from "@/lib/api/detail/type";
import { getUserMe } from "@/lib/api/userMe";

export default function Comment({ data, commentRef }: CommentProps) {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserMe(),
  });
  const cardId = data?.id;

  const { data: commentListData } = useQuery({
    queryKey: ["commentList", data?.id],
    queryFn: async () => {
      const res = await getCommentList(Number(data.id));
      return res;
    },
  });
  const commentList = commentListData?.data;

  return (
    <div className="relative flex w-full flex-col items-start gap-32 self-stretch tablet:gap-24">
      <span className="text-20 tablet:text-18">댓글</span>
      <div className="flex w-full flex-col items-start gap-40 self-stretch">
        <div className="flex w-full flex-col items-start gap-20 self-stretch">
          {commentList?.map((item: any) =>
            userData?.nickname === item.nickname ? (
              <MyComment
                key={item.id}
                data={item}
                user={userData}
                cardId={cardId}
              />
            ) : (
              <OthersComment
                key={item.id}
                data={item}
                user={userData}
                cardId={cardId}
              />
            ),
          )}
          <RegisterComment data={data} user={userData} />
        </div>
      </div>
      <div ref={commentRef} className="absolute top-[610px] h-1 w-full"></div>
    </div>
  );
}
