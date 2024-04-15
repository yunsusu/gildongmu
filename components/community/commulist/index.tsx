import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CommuChat from "@/components/community/commuchat";
import useCookie from "@/hooks/useCookie";
import { getChatList } from "@/lib/api/chat";

interface Room {
  id: number;
  lastChatMessage: string;
  lastChatAt: string;
  headCount: number;
  thumbnail: string;
  title: string;
}

function CommuList() {
  const accessToken = useCookie("accessToken");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken && !isLoading) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [accessToken, isLoading, router]);

  const { data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getChatList(),
  });

  return (
    <div
      style={{ height: "calc(100% - 120px)" }}
      className="m-auto h-full w-full max-w-[1200px] px-40 pb-40 tablet:px-20 tablet:pb-20"
    >
      <div className="h-full w-full overflow-hidden rounded-32 border-2 border-lime-300 bg-white  py-40">
        <div className="h-full w-full overflow-y-scroll bg-white">
          {rooms?.content[0] ? (
            <>
              {rooms.content.map((item: Room, index: number) => (
                <CommuChat key={index} item={item} />
              ))}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-32 bg-white tablet:gap-24">
              <div className="justify-cente flex flex-col items-center gap-24 tablet:gap-20">
                <div className="relative h-160 w-240 tablet:h-128 tablet:w-192">
                  <Image
                    src={"/images/Image_Chat.png"}
                    fill
                    alt={"채팅 없음"}
                    objectFit="cover"
                    sizes="240px"
                  />
                </div>
                <div className="text-24 font-semibold leading-[31.2px] tracking-tighter text-text-01 tablet:text-20">
                  참여 중인 길동무 모임이 없어요!
                </div>
              </div>
              <Link href={"/travel"}>
                <button className="flex w-200 items-center justify-center rounded-32 border border-stone-700 px-10 py-16 text-center font-bold leading-5 text-stone-700 hover:border-stone-500 hover:text-stone-500 tablet:h-44 tablet:w-180">
                  길동무 찾으러 가기
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CommuList;
