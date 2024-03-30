import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

// import io from "socket.io-client";
import ChatCome from "@/components/community/chatCome";
import ChatDate from "@/components/community/chatDate";
import ChatHeader from "@/components/community/chatHeader";
import MyChat from "@/components/community/myChat";
import UserChat from "@/components/community/userChat";
import { getChatPrev, getChatStatus } from "@/lib/api/chat";
interface IFormInput {
  message: string;
}

// const socket = io("서버주소");

function Chat() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  const { id } = router.query;

  const { data: chatHeader } = useQuery({
    queryKey: ["chat", { id }],
    queryFn: () => getChatStatus(Number(id)),
  });

  const { data: chatPrev } = useQuery({
    queryKey: ["chatPrev", { id }],
    queryFn: () => getChatPrev(Number(1)),
  });

  const nickname = "닉네임";
  const date = "2023년 3월 24일(일)";

  return (
    <div className="fixed top-0 z-50 h-full w-full bg-white">
      <ChatHeader chatHeader={chatHeader} />
      <div className="flex flex-col gap-20 overflow-x-hidden overflow-y-scroll p-20">
        <div className="flex flex-col items-center gap-20">
          <ChatDate text={date} />
          <ChatCome text={`${nickname}님이 참가했습니다.`} />
        </div>
        {chatPrev?.content.map((item: any, index: number) =>
          item?.sender.isCurrentUser ? (
            <MyChat key={index} user={item} />
          ) : (
            <UserChat key={index} user={item} />
          ),
        )}
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
