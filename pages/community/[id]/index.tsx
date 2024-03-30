import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

// import io from "socket.io-client";
import ChatCome from "@/components/community/chatCome";
import ChatDate from "@/components/community/chatDate";
import ChatHeader from "@/components/community/chatHeader";
import MyChat from "@/components/community/myChat";
import UserChat from "@/components/community/userChat";
interface IFormInput {
  message: string;
}

// const socket = io("서버주소");

function Chat() {
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  const nickname = "닉네임";
  const date = "2023년 3월 24일(일)";
  const user = {
    chatId: 24,
    roomId: 1,
    message: "hi",
    chatType: "MESSAGE",
    createdAt: "2024-03-23T20:23:48.714",
    user: {
      nickname: "우사기",
      userId: "1",
      profilePath:
        "https://i.namu.wiki/i/GhX-s08WRsBKrZeRfuqTR4XHo_GwXCKBLgYz1egU9AA74IrRIHp0TytqZm4YZgVd59l4e9pogbDnKcBz86souE-v-O_yCu2cAFjX0ulvem_eYMY3jrOA12ENwaGuH9pKsptVVHgE_xSmlxJBTgySDg.webp",
      isCurrentUser: false,
    },
  };

  return (
    <div className="fixed top-0 z-50 h-full w-full bg-white">
      <ChatHeader />
      <div className="flex flex-col gap-20 overflow-x-hidden overflow-y-scroll p-20">
        <div className="flex flex-col items-center gap-20">
          <ChatDate text={date} />
          <ChatCome text={`${nickname}님이 참가했습니다.`} />
        </div>
        <UserChat user={user} />
        <MyChat user={user} />
      </div>

      <div className="fixed bottom-0 w-full bg-stone-100 p-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-60 w-full items-center gap-6 overflow-hidden rounded-32 bg-white pr-8"
        >
          <input
            type="text"
            className="h-full flex-1 rounded-32 px-20"
            placeholder="메시지 보내기"
            {...register("message")}
          />
          <button type="submit" className="relative h-44 w-44 cursor-pointer">
            <Image
              src={
                watch("message")
                  ? "/images/button_on.svg"
                  : "/images/button_off.svg"
              }
              alt="전송"
              fill
            />
          </button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
