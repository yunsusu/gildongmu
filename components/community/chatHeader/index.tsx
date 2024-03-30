import Image from "next/image";
import { useState } from "react";

import ChatUserList from "@/components/community/chatUserList";

interface chatHeaderProp {
  chatHeader: {
    id: number;
    headCount: number;
    thumbnail: string;
    title: string;
  };
}

function ChatHeader({ chatHeader }: chatHeaderProp) {
  const [hammenu, setHammenu] = useState(true);

  return (
    <div className="flex items-center justify-between gap-16 border-b border-line-01 p-20">
      <div className="relative h-52 w-52 overflow-hidden rounded-16">
        <Image
          src={
            chatHeader?.thumbnail ? chatHeader.thumbnail : `/images/logo.svg`
          }
          alt="대표이미지"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="mb-8 line-clamp-1">{chatHeader?.title}</div>
        <div className="flex text-16 tablet:text-14">
          <div className="relative h-20 w-20">
            <Image src={"/icons/profile.svg"} alt="인원수" fill />
          </div>
          {chatHeader?.headCount}
        </div>
      </div>

      <div className="relative z-20 h-32 w-32">
        <Image
          onClick={() => setHammenu(prev => !prev)}
          src={hammenu ? "/icons/menu.svg" : "/icons/close.svg"}
          alt="햄버거메뉴"
          fill
          className="cursor-pointer object-cover"
        />
      </div>
      {!hammenu && (
        <>
          <div
            onClick={() => setHammenu(prev => !prev)}
            className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-60"
          />
          <div className="fixed right-0 top-0 z-10 flex h-full w-3/4 flex-col gap-24 bg-white p-20">
            <div className="pt-13 text-18 font-bold">참여 인원</div>

            <ChatUserList />
            <ChatUserList />
            <ChatUserList />
            <ChatUserList />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatHeader;
