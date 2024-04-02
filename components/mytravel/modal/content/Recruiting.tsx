import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

import Modal from "@/components/modal";
import Chip from "@/components/mytravel/modal/Chip";
import { Participant } from "@/components/mytravel/modal/content/Participating";
import useToggle from "@/hooks/useToggle";
import axios from "@/lib/api/axios";

export default function RecruitingContent({ data }: any) {
  const [isMobile, setIsMobile] = useToggle(true);
  const [pass, setPass] = useState(true);
  const [participants, setParticipants] = useState<any>();
  const [applicants, setApplicants] = useState<any>();
  const [isExileModalOpen, setIsExileModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const getParticipantData = async () => {
    try {
      const temp = await axios.get(
        `/posts/${data.id}/participants?status=ACCEPTED`,
      );
      const res = temp.data;
      setParticipants(res);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  const getApplicantData = async () => {
    try {
      const temp = await axios.get(
        `/posts/${data.id}/participants?status=PENDING`,
      );
      const res = temp.data;
      setApplicants(res);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  useEffect(() => {
    getParticipantData();
    getApplicantData();
  }, []);

  const participantExile = useMutation({
    mutationFn: (type: any) =>
      axios.delete(`/posts/${data.id}/participants/${type.id}`),
    onSuccess: () => {
      setIsExileModalOpen(!isExileModalOpen);
      queryClient.invalidateQueries();
    },
  });

  const applicationAccept = useMutation({
    mutationFn: (type: any) =>
      axios.put(`/posts/${data.id}/participants/${type.id}`),
    onSuccess: () => {
      setIsAcceptModalOpen(!isAcceptModalOpen);
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
      setPass(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  const header = (text: string) => (
    <div
      className={`flex h-63 w-full items-center justify-${
        isMobile ? "between" : "start"
      } rounded-t-24 bg-line-02 px-32 py-20`}
    >
      {isMobile && (
        <button
          onClick={() => {
            setPass(!pass);
          }}
        >
          <Image
            src="/icons/chevron-left-gray.png"
            alt="화살표 이미지"
            width={24}
            height={24}
          />
        </button>
      )}
      <div className="text-16 font-semibold leading-[130%] tracking-[-0.6px]">
        {text}
      </div>
      {isMobile && (
        <button
          onClick={() => {
            setPass(!pass);
          }}
        >
          <Image
            src="/icons/chevron-right-gray.png"
            alt="화살표 이미지"
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );

  const userList = (text: string) => (
    <>
      {text === "participants" && participants && participants.length > 0
        ? (participants && participants.length > 0 && participants)
            .reverse()
            .map((participant: Participant, index: number) => (
              <div
                key={`participant_${index}`}
                className="flex w-full justify-between"
              >
                <div className="flex items-center justify-center gap-12">
                  <Image
                    src={
                      participant.user.profilePath
                        ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${participant.user.profilePath}`
                        : "/icons/defaultProfile.png"
                    }
                    alt="프로필 이미지"
                    width={32}
                    height={32}
                    key={`participant_image_${index}`}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                  {participant.isLeader && <Chip chip="leader" />}
                  <span
                    key={`participant_span_${index}`}
                    className="truncate text-16 font-normal leading-[130%] tracking-[-0.6px] text-text-01 mobile:text-14"
                  >
                    {participant.user.nickname}
                  </span>
                </div>
                {pass &&
                  text === "participants" &&
                  !participant.isLeader &&
                  participant.isAccepted && (
                    <>
                      <button
                        key={`participant_button_${index}`}
                        className="flex h-36 items-center justify-center py-10 text-center font-bold leading-[20px] text-stone-700 hover:text-stone-500 mobile:h-32"
                        onClick={() => {
                          setIsExileModalOpen(!isExileModalOpen);
                        }}
                      >
                        {isMobile ? "추방" : "추방하기"}
                      </button>
                      {isExileModalOpen && (
                        <Modal
                          modalType="participantExile"
                          onClose={() => setIsExileModalOpen(!isExileModalOpen)}
                          onCancel={() =>
                            setIsExileModalOpen(!isExileModalOpen)
                          }
                          onConfirm={() => {
                            participantExile.mutate(participant);
                          }}
                        />
                      )}
                    </>
                  )}
              </div>
            ))
        : text === "applicants" && applicants && applicants.length > 0
          ? (applicants && applicants.length > 0 && applicants)
              .reverse()
              .map((applicant: Participant, index: number) =>
                !applicant.user.isCurrentUser ? (
                  <div
                    key={`applicant_${index}`}
                    className="flex w-full justify-between"
                  >
                    <div className="flex items-center justify-center gap-12">
                      <Image
                        src={
                          applicant.user.profilePath
                            ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${applicant.user.profilePath}`
                            : "/icons/defaultProfile.png"
                        }
                        alt="프로필 이미지"
                        width={32}
                        height={32}
                        key={`applicant_image_${index}`}
                        className="h-32 w-32 rounded-full object-cover"
                      />
                      {applicant.isLeader && <Chip chip="leader" />}
                      <span
                        key={`applicant_span_${index}`}
                        className="truncate text-16 font-normal leading-[130%] tracking-[-0.6px] text-text-01 mobile:text-14"
                      >
                        {applicant.user.nickname}
                      </span>
                    </div>
                    {text === "applicants" && !applicant.user.isCurrentUser && (
                      <div className="flex gap-10">
                        <button
                          className="flex h-36 items-center justify-center py-10 text-center font-bold leading-[20px] text-stone-700 hover:text-stone-500 mobile:h-32"
                          key={`applicant_declineButton_${index}`}
                          onClick={() => setIsExileModalOpen(!isExileModalOpen)}
                        >
                          거절
                        </button>
                        {isExileModalOpen && (
                          <Modal
                            modalType="applicationReject"
                            onClose={() =>
                              setIsExileModalOpen(!isExileModalOpen)
                            }
                            onCancel={() =>
                              setIsExileModalOpen(!isExileModalOpen)
                            }
                            onConfirm={() => {
                              participantExile.mutate(applicant);
                            }}
                          />
                        )}
                        {data.numberOfPeople >=
                          data.numberOfPeople - participants?.length && (
                          <button
                            className="flex h-36 items-center justify-center py-10 text-center font-bold leading-[20px] text-primary hover:text-primary-press mobile:h-32"
                            key={`applicant_acceptButtonn_${index}`}
                            onClick={() =>
                              setIsAcceptModalOpen(!isAcceptModalOpen)
                            }
                          >
                            수락
                          </button>
                        )}
                        {isAcceptModalOpen && (
                          <Modal
                            modalType="applicationAccept"
                            onClose={() =>
                              setIsAcceptModalOpen(!isAcceptModalOpen)
                            }
                            onCancel={() =>
                              setIsAcceptModalOpen(!isAcceptModalOpen)
                            }
                            onConfirm={() => {
                              applicationAccept.mutate(applicant);
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ) : null,
              )
          : null}
    </>
  );

  return (
    <div className="flex w-full items-center justify-center gap-24 tablet:flex-col">
      <div className="flex w-full flex-col items-start justify-center rounded-24 border border-line-02">
        {header(
          pass
            ? `현재 인원 (${participants?.length || 0}/${data.numberOfPeople})`
            : "신청자 목록",
        )}
        <div className="flex h-[400px] w-full flex-col items-start gap-10 overflow-scroll overflow-x-hidden py-24 pl-32 pr-24 tablet:h-[297px] tablet:px-24 tablet:py-20 mobile:px-20 mobile:py-16">
          <div className="flex w-full flex-col items-center justify-between gap-10">
            {userList(pass ? "participants" : "applicants")}
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="flex w-full flex-col items-start justify-center rounded-24 border border-line-02">
          {header("신청자 목록")}
          <div className="flex h-[400px] w-full flex-col items-start gap-10 overflow-scroll overflow-x-hidden py-24 pl-32 pr-24 tablet:h-[297px] tablet:px-24 tablet:py-20 mobile:px-20 mobile:py-16">
            <div className="flex w-full flex-col items-center justify-between gap-10">
              {userList("applicants")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
