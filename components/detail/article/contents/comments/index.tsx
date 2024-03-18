import MyComment from "@/components/detail/article/contents/comments/my";
import SecretMyComment from "@/components/detail/article/contents/comments/my/secret";
import OthersComment from "@/components/detail/article/contents/comments/others";
import RegisterComment from "@/components/detail/article/contents/comments/register";
import SecretCommment from "@/components/detail/article/contents/comments/secret";

export default function Comment() {
  return (
    <div
      id="comment"
      className="flex w-full flex-col items-start gap-32 self-stretch pt-60"
    >
      <span>댓글</span>
      <div className="flex w-full flex-col items-start gap-40 self-stretch">
        <div className="flex w-full flex-col items-start gap-20 self-stretch">
          {<OthersComment />}
          <SecretCommment />
          <MyComment />
          <SecretMyComment />
          <RegisterComment />
        </div>
      </div>
    </div>
  );
}