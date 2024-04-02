import SecretCommentOfComment from "@/components/detail/article/contents/comments/secret/commentOfcomment";

export default function SecretCommment() {
  return (
    <>
      <div className="flex items-start gap-8 self-stretch py-12">
        <span className="overflow-hidden text-ellipsis text-16 font-normal leading-6 tracking-[-0.6px] text-text-02 mobile:text-14 mobile:leading-[21px]">
          비밀 댓글입니다.
        </span>
      </div>
      <SecretCommentOfComment />
      <div className="h-[1px] self-stretch bg-sky-200"></div>
    </>
  );
}
