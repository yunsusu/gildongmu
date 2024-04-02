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
  const [chatPage, setChatPage] = useState(0);
  const [prevPage, setPrevPage] = useState(20);
  const [next, setNext] = useState(true);
  const accessToken = useCookie("accessToken");
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, watch, reset } = useForm<IFormInput>();
  const [messages, setMessages] = useState<string[]>([]);
  const stompClient = useRef<Client | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
            stompClient.current.subscribe(`/rooms/${id}`, message => {
              const newMessage = JSON.parse(message.body);
              setMessages(prev => [...prev, newMessage]);
            });
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

  const { data: chatHeader } = useQuery({
    queryKey: ["chat", { id }],
    queryFn: () => getChatStatus(Number(id)),
  });

  const { data: chatPrev } = useQuery({
    queryKey: ["chatPrev", { id, chatPage, prevPage }],
    queryFn: () => getChatPrev(Number(id), chatPage, prevPage),
  });

  let num = 0;
  for (let i = 0; i < chatPrev?.content.length; i++) {
    num += chatPrev.content[i].chats.length;
  }

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (num < prevPage) {
      setNext(false);
    } else {
      setNext(true);
    }
    if (prevPage <= 20) {
      scrollToBottom();
    }
  }, [num, prevPage]);

  return (
    <div className="fixed top-0 z-50 h-full w-full bg-white pb-60">
      <ChatHeader chatHeader={chatHeader} />
      <div
        ref={scrollRef}
        className="h-full overflow-y-scroll"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {next && (
          <div
            className="w-full cursor-pointer p-20 text-center opacity-30 hover:opacity-100"
            onClick={() => {
              setPrevPage(prev => prev + 30);
              scrollToTop();
            }}
          >
            이전 채팅 불러오기
          </div>
        )}
        {chatPrev?.content
          .slice()
          .reverse()
          .map((item: any, index: number) => (
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
                  item?.chats
                    .slice()
                    .reverse()
                    .map((item: any, index: number) => {
                      if (!item?.sender) {
                        return (
                          <div
                            key={item.id || index}
                            className="flex justify-center"
                          >
                            <ChatCome text={item.content} />
                          </div>
                        );
                      } else if (item.sender.isCurrentUser) {
                        return <MyChat key={item.id || index} user={item} />;
                      } else {
                        return <UserChat key={item.id || index} user={item} />;
                      }
                    })
                )}
                {messages.map((item: any, index: number) => {
                  if (item.sender.isCurrentUser) {
                    return <MyChat key={index} user={item} />;
                  } else {
                    return <UserChat key={index} user={item} />;
                  }
                })}
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
            autoComplete="off"
            type="text"
            className="h-full flex-1 rounded-32 px-20 outline-none"
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
