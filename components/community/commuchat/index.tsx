import Image from "next/image";
import { useEffect, useState } from "react";
// import io from "socket.io-client";
interface itemType {
  item: {
    id: number;
    lastChatMessage: string;
    lastChatAt: string;
    headCount: number;
    thumbnail: string;
    title: string;
  };
}

// const socket = io(`http://3.38.76.39:8080/rooms/${1}`);

function CommuChat({ item }: itemType) {
  const [prevTime, setPrevTime] = useState("");

  useEffect(() => {
    const lastChatTime = new Date();
    const lastChatAtDate = new Date(item.lastChatAt);
    const time = (Number(lastChatTime) - Number(lastChatAtDate)) / 1000 / 60;

    if (time <= 60) {
      setPrevTime(`${Math.round(time)}분 전`);
    } else if (time > 60 && time <= 24 * 60) {
      setPrevTime(`${Math.round(time / 60)}시간 전`);
    } else {
      const month = lastChatAtDate.getMonth() + 1;
      const date = lastChatAtDate.getDate();
      setPrevTime(`${month}월 ${date}일`);
    }
  }, [item.lastChatAt]);
  return (
    <div
      onClick={() =>
        window.open(`/community/${item.id}`, "_blank", "width=400,height=700")
      }
      className="flex h-92 w-full cursor-pointer justify-between gap-10 rounded-16 px-40 py-16 hover:bg-yellow-50 tablet:px-20"
    >
      <div className="flex flex-1 gap-24 ">
        <div className="relative h-60 w-60 tablet:h-48 tablet:w-48">
          <Image
            src={
              item.thumbnail
                ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${item.thumbnail}`
                : "/images/logo.svg"
            }
            alt="대표이미지"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-16 text-18 text-text-01 tablet:text-16">
            <div className="line-clamp-1">{item.title}</div>
            <div className="flex text-16 tablet:text-14">
              <div className="relative h-20 w-20">
                <Image src={"/icons/profile.svg"} alt="인원수" fill />
              </div>
              {item.headCount}
            </div>
          </div>
          <div className="line-clamp-2 text-16 text-text-02 tablet:text-14">
            {item.lastChatMessage}
          </div>
        </div>
      </div>

      <div className="flex-3 text-16 text-text-03 tablet:text-14">
        {prevTime}
      </div>
    </div>
  );
}
export default CommuChat;
