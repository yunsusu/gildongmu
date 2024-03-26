import MyComment from "@/components/detail/article/contents/comments/my";
import SecretMyComment from "@/components/detail/article/contents/comments/my/secret";
import OthersComment from "@/components/detail/article/contents/comments/others";
import RegisterComment from "@/components/detail/article/contents/comments/register";
import SecretCommment from "@/components/detail/article/contents/comments/secret";

export default function Comment({ commentRef }: any) {
  return (
    <div
      id="comment"
      className="relative flex w-full flex-col items-start gap-32 self-stretch pt-60 tablet:gap-24"
    >
      <span className="text-20 tablet:text-18">댓글</span>
      <div className="flex w-full flex-col items-start gap-40 self-stretch">
        <div className="flex w-full flex-col items-start gap-20 self-stretch">
          {<OthersComment />}
          <SecretCommment />
          <MyComment />
          <SecretMyComment />
          <RegisterComment />
        </div>
      </div>
      <div ref={commentRef} className="absolute top-[670px] h-1 w-full"></div>
    </div>
  );
}
