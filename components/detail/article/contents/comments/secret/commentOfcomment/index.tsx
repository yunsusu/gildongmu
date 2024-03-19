import Image from "next/image";

export default function SecretCommentOfComment() {
  return (
    <>
      <div className="flex w-full items-start gap-12 rounded-12 bg-bg-02 px-20 py-16">
        <div className="relative h-32 w-24">
          <Image src="/icons/frame.svg" alt="대댓글 이미지" fill />
        </div>
        <div className="flex items-start gap-8 py-12">
          <span className="text-16 font-normal not-italic leading-[20.8px] tracking-[-0.6px] text-text-02">
            {"비밀 댓글입니다."}
          </span>
        </div>
      </div>
    </>
  );
}
