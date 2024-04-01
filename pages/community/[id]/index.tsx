import { Client } from "@stomp/stompjs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import ChatCome from "@/components/community/chatCome";
import ChatDate from "@/components/community/chatDate";
import ChatHeader from "@/components/community/chatHeader";
import MyChat from "@/components/community/myChat";
import UserChat from "@/components/community/userChat";
import useCookie from "@/hooks/useCookie";
import { getChatPrev, getChatStatus } from "@/lib/api/chat";
interface IFormInput {
  message: string;
}

function Chat() {
  const accessToken = useCookie("accessToken");
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, watch, reset } = useForm<IFormInput>();
  const [messages, setMessages] = useState<string[]>([]);
  const stompClient = useRef<Client | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  console.log(messages);
  const onSubmit: SubmitHandler<IFormInput> = data => {
    if (stompClient.current?.connected && accessToken) {
      const messageToSend = { message: data.message };
      stompClient.current.publish({
        destination: `/chat/rooms/${id}/message`,
        headers: { Authorization: accessToken },
        body: JSON.stringify(messageToSend),
      });
      reset();
    } else {
      console.error("STOMP 클라이언트가 연결되지 않았습니다.");
    }
  };

  useEffect(() => {
    if (accessToken && id) {
      stompClient.current = new Client({
        brokerURL: `ws://3.38.76.39:8081/group-chat/websocket`,
        connectHeaders: {
          Authorization: accessToken,
        },
        onConnect: () => {
          console.log("STOMP 연결 성공!");
          if (stompClient.current) {
            stompClient.current.subscribe(
              `/chat/rooms/${id}/message`,
              message => {
                const newMessage = JSON.parse(message.body);
                setMessages(prev => [...prev, newMessage]);
              },
            );
          }
        },
        onDisconnect: () => {
          console.log("STOMP 클라이언트 연결 해제.");
        },
      });

      stompClient.current.activate();

      return () => {
        if (stompClient.current) {
          stompClient.current.deactivate();
        }
      };
    }
  }, [accessToken, id]);

  // useEffect(() => {
  //   const scroll = scrollRef.current as HTMLDivElement;
  //   if (scroll) {
  //     scroll.scrollTop = scroll.scrollHeight;
  //   }
  // }, [messages]);

  const { data: chatHeader } = useQuery({
    queryKey: ["chat", { id }],
    queryFn: () => getChatStatus(Number(id)),
  });

  const { data: chatPrev } = useQuery({
    queryKey: ["chatPrev", { id }],
    queryFn: () => getChatPrev(Number(id)),
  });

  return (
    <div className="fixed top-0 z-50 h-full w-full bg-white pb-60">
      <ChatHeader chatHeader={chatHeader} />
      <div
        ref={scrollRef}
        className="h-full overflow-y-scroll"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {chatPrev?.content?.map((item: any, index: number) => (
          <div key={index}>
            <div className="flex flex-col gap-20 overflow-x-hidden p-20">
              <div className="flex flex-col items-center gap-20">
                <ChatDate text={item?.date} />
              </div>
              {item.chats?.isLoading ? (
                <p>메시지 로딩 중...</p>
              ) : item.chats?.isError ? (
                <p>메시지를 불러오는 데 실패했습니다.</p>
              ) : (
                item?.chats.map((item: any, index: number) => {
                  if (item?.sender === undefined) {
                    return (
                      <div key={index} className="flex justify-center">
                        <ChatCome text={item.content} />
                      </div>
                    );
                  } else if (item.sender.isCurrentUser) {
                    return <MyChat key={index} user={item} />;
                  } else {
                    return <UserChat key={index} user={item} />;
                  }
                })
              )}
            </div>
          </div>
        ))}
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
