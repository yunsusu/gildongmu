import Image from "next/image";
import { useEffect, useState } from "react";

import Chip from "@/components/mytravel/modal/Chip";
import axios from "@/lib/api/axios";

export interface Data {
  data: any;
}

export interface Participant {
  id: number;
  isLeader: boolean;
  isAccepted: boolean;
  user: {
    id: number;
    nickname: string;
    profilePath: string;
    isCurrentUser: boolean;
  };
}

export default function ParticipatingContent({ data, onClose }: any) {
  const [participants, setParticipants] = useState<Participant[]>();

  const getParticipantData = async () => {
    try {
      const temp = await axios.get(
        `/posts/${data.id}/participants?status=ACCEPTED`,
      );
      const res = temp.data;

      setParticipants(res);
      console.log(res);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  const cancelApplication = async () => {
    try {
      const temp = await axios.delete(`/posts/${data.id}/participants`);
      const res = temp.data;
      setParticipants(res);
      getParticipantData();
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  useEffect(() => {
    getParticipantData();
  }, []);

  return (
    <div className="flex w-full flex-col items-start justify-center rounded-24 border border-line-02">
      <div className="flex h-63 w-full items-center justify-start rounded-t-24 bg-line-02 px-32 py-20 text-16 font-semibold leading-[130%] tracking-[-0.6px] tablet:px-24 tablet:py-16 mobile:px-20">
        {`현재 인원 (${participants?.length || 0}/${data.numberOfPeople})`}
      </div>
      <div className="flex h-[400px] w-full flex-col gap-10 overflow-scroll overflow-x-hidden px-32 py-24 tablet:h-[550px] tablet:px-24 tablet:py-20 mobile:h-[500px] mobile:px-20 mobile:py-16">
        {participants &&
          participants.length > 0 &&
          participants
            .slice()
            .reverse()
            .map((member, index) => (
              <div
                className="flex w-full items-center justify-between"
                key={index}
              >
                <div className="flex items-center justify-center gap-12">
                  {member.user.profilePath && (
                    <Image
                      src={member.user.profilePath || "/icons/모몽가2.png"}
                      alt="프로필 이미지"
                      width={32}
                      height={32}
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  )}
                  {member.isLeader && <Chip chip="leader" />}
                  {member.user.isCurrentUser && <Chip chip="me" />}
                  <span className="text-16 font-normal leading-[130%] tracking-[-0.6px] text-text-01 mobile:truncate mobile:text-14">
                    {member.user.nickname}
                  </span>
                </div>
                {data.status && member.user.isCurrentUser && (
                  <button
                    className="flex h-36 items-center justify-center rounded-32 bg-primary px-16 py-10 text-center font-bold leading-[20px] text-white hover:bg-primary-press mobile:h-32"
                    onClick={e => {
                      e.stopPropagation();
                      cancelApplication();
                      onClose();
                    }}
                  >
                    신청 취소
                  </button>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
