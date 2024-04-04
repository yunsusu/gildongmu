import { useQuery, useQueryClient } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "@/lib/api/axios";

interface ChatProps {
  user: {
    id: string;
    content: string;
    createdAt: string;
    type: string;
    sender: {
      id: number;
      nickname: string;
      profilePath: string;
      isCurrentUser: boolean;
    };
  };
}
function NickNameChange({ user }: ChatProps) {
  const [sendDate, setSendDate] = useState("");
  const [nickChange, setNickChange] = useState("");
  const [prevNick, setPrevNick] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const fetchMembers = async (roomId: string | string[] | undefined) => {
    const res = await axios.get(`/rooms/${roomId}/participants`);
    return res.data;
  };

  const { data: member } = useQuery({
    queryKey: ["chatMember", id],
    queryFn: () => fetchMembers(id),
  });

  useEffect(() => {
    if (member?.length > 0) {
      const matchedMember = member.find(
        (m: { user: { id: number } }) => m.user.id === user.sender.id,
      );
      if (
        matchedMember &&
        matchedMember.user.nickname !== user.sender.nickname
      ) {
        setNickChange(matchedMember.user.nickname);
        setPrevNick(user.sender.nickname);
      }
    }
  }, [member, user]);

  useEffect(() => {
    if (user?.createdAt) {
      const date = parseISO(user.createdAt).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setSendDate(date);
    } else {
      const now = new Date();
      const date = now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setSendDate(date);
    }
  }, [user?.createdAt]);

  return nickChange !== "" && prevNick !== nickChange ? (
    <div className="flex w-full justify-start gap-8">
      <div className="relative h-40 w-40 overflow-hidden rounded-16">
        <Image
          src={
            user.sender?.profilePath
              ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${user.sender?.profilePath}`
              : "/images/logo.svg"
          }
          alt={`${user.sender?.nickname}의 프로필`}
          fill
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 break-all">
        <div className="text-14 text-text-03">{user.sender?.nickname}</div>
        <div className="flex w-full items-end gap-8">
          <div className="min-h-35 max-w-max flex-1 rounded-6 bg-stone-100 px-8 py-4 text-18 text-text-01">
            {nickChange !== user.sender.nickname &&
              `📢 ${nickChange} → ${user.sender.nickname}로 닉네임을 변경했습니다! 📢`}
          </div>
          <div className="text-12 text-text-04">{sendDate}</div>
        </div>
      </div>
    </div>
  ) : null;
}

export default NickNameChange;
function fetchMembers(id: any): any {
  throw new Error("Function not implemented.");
}
