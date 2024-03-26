import Image from "next/image";

function CommuChat() {
  return (
    <div className="flex h-92 w-full justify-between gap-10 px-40 py-16 hover:bg-yellow-50 tablet:px-20">
      <div className="flex flex-1 gap-24 ">
        <div className="relative h-60 w-60 tablet:h-48 tablet:w-48">
          <Image src={"/images/logo.svg"} alt="대표이미지" fill />
        </div>
        <div className="flex-1">
          <div className="flex gap-16 text-18 text-text-01 tablet:text-16">
            <div className="line-clamp-1">제목제목제목제목제목제목제목</div>
            <div className="flex text-16 tablet:text-14">
              <div className="relative h-20 w-20">
                <Image src={"icons/profile.svg"} alt="인원수" fill />
              </div>
              10
            </div>
          </div>
          <div className="line-clamp-2 text-16 text-text-02 tablet:text-14">
            서브 텍스트서브 텍스트서브 텍스트서브 텍스트서브 텍스트서브 텍스트
            서브 텍스트서브 텍스트서브 텍스트서브 텍스트서브 텍스트서브 텍스트
            서브 텍스트서브 텍스트서브 텍스트서브 텍스트서브 텍스트서브 텍스
          </div>
        </div>
      </div>

      <div className="flex-3 text-16 text-text-03 tablet:text-14">5분전</div>
    </div>
  );
}
export default CommuChat;
