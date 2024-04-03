import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ReactNode } from "react";

import ModalLayout from "@/components/modal/layout";
import axios from "@/lib/api/axios";

export type ModalType =
  | "loginRequired"
  | "emailNotFound"
  | "passwordMismatch"
  | "signupSuccess"
  | "emailInUse"
  | "writingSuccess"
  | "writingCancel"
  | "writingDelete"
  | "userProfile"
  | "travelApply"
  | "travelCancle"
  | "failCheckPassword"
  | "changeProfileSuccess"
  | "profileEdit"
  | "memberExile"
  | "deleteComment"
  | "cancelEditing"
  | "participantExile"
  | "applicationAccept"
  | "applicationReject"
  | "editingSuccess";

interface ModalProps {
  modalType: ModalType;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  data?: any;
}

export default function Modal({
  modalType,
  onClose,
  onConfirm,
  onCancel,
  data,
}: ModalProps) {
  let title: string = "";
  let message: string | ReactNode = "";

  const tagStyles = ["bg-tag-orange-100", "bg-tag-blue-100", "bg-tag-pink-100"];
  const tagTextStyles = [
    "text-tag-orange-500",
    "text-tag-blue-500",
    "text-tag-pink-500",
  ];

  const getProfileData = async () => {
    try {
      const res = await axios.get(`/users/${data.userId}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileData(),
  });

  console.log(profile);

  switch (modalType) {
    case "loginRequired":
      title = "";
      message = "로그인이 필요합니다.";
      break;
    case "emailNotFound":
      title = "로그인 실패";
      message = "존재하지 않는 이메일입니다.";
      break;
    case "passwordMismatch":
      title = "로그인 실패";
      message = "비밀번호를 확인해주세요.";
      break;
    case "signupSuccess":
      title = "회원가입 완료";
      message = "가입이 완료되었습니다.";
      break;
    case "emailInUse":
      title = "";
      message = "이미 사용중인 이메일입니다.";
      break;
    case "writingSuccess":
      title = "";
      message = "모집글 작성을 완료했습니다.";
      break;
    case "deleteComment":
      title = "댓글 삭제";
      message = "댓글을 삭제하시겠습니까?";
      break;
    case "cancelEditing":
      title = "수정 취소";
      message = (
        <>
          작성 중인 댓글은 저장되지 않습니다.
          <br />
          취소하시겠습니까?
        </>
      );
      break;
    case "writingCancel":
      title = "글쓰기 취소";
      message = (
        <>
          글쓰기를 취소하시겠습니까?
          <br />
          작성 중인 내용은 저장되지 않습니다.
        </>
      );
      break;
    case "writingDelete":
      title = "글 삭제하기";
      message = (
        <>
          글을 삭제하시겠습니까?
          <br />
          삭제된 글은 복구할 수 없습니다.
        </>
      );
      break;
    case "userProfile":
      title = "사용자 프로필";
      message = (
        <div className="moblie:gap-12 flex w-[432px] flex-col gap-20 mobile:w-272">
          <div className="flex flex-col items-center gap-12 mobile:gap-8">
            <div className="moblie:w-64 h-72 w-72 overflow-hidden rounded-full mobile:h-64">
              <Image
                src={
                  profile?.profilePath
                    ? `https://gildongmuu.s3.ap-northeast-2.amazonaws.com/${profile.profilePath}`
                    : "/icons/defaultProfile.png"
                }
                alt="프로필 이미지"
                width={72}
                height={72}
                className="moblie:w-64 h-72 w-72 object-cover mobile:h-64"
              />
            </div>
            <div className="text-center text-16 font-bold leading-[130%] tracking-[0.6px] text-text-01 mobile:text-14">
              {`${profile?.nickname}(${profile?.gender === "MALE" ? "남" : "여"})`}
            </div>
          </div>
          <div className="flex w-[432px] flex-wrap items-center justify-center gap-12 mobile:w-272 mobile:gap-8">
            {profile?.favoriteSpots?.map(
              (favoriteSpot: string, index: number) => (
                <span
                  key={index}
                  className={`moblie:py-12 flex h-34 items-center gap-5 rounded-24 bg-primary px-13 py-16 text-16 mobile:h-28 mobile:text-14 ${tagStyles[index]} ${tagTextStyles[index]}`}
                >
                  # {favoriteSpot}
                </span>
              ),
            )}
          </div>
          <div className="justify-left flex w-full items-center self-stretch rounded-16 bg-bg-02 p-16 text-left text-14 font-normal">
            {profile?.bio?.length > 75
              ? `#${profile?.bio.slice(0, 75)} ...`
              : profile?.bio}
          </div>
        </div>
      );
      break;
    case "travelApply":
      title = "신청하기";
      message = (
        <>
          길동무 모집 정보를 확인하셨나요?
          <br />
          신청하시겠습니까?
        </>
      );
      break;
    case "travelCancle":
      title = "취소하기";
      message = "이 길동무 신청을 취소하시겠습니까?";
      break;
    case "failCheckPassword":
      title = "";
      message = "비밀번호가 일치하지 않습니다.";
      break;
    case "changeProfileSuccess":
      title = "";
      message = "회원 정보 변경을 완료했습니다.";
      break;
    case "profileEdit":
      title = "수정 완료";
      message = "프로필 정보가 수정되었습니다.";
      break;
    case "participantExile":
      title = "내보내기";
      message = (
        <>
          현재 참여 중인 길동무를
          <br />
          내보내시겠습니까?
        </>
      );
      break;
    case "applicationAccept":
      title = "신청 수락";
      message = (
        <>
          현재 신청 중인 길동무를
          <br />
          수락하시겠습니까?
        </>
      );
      break;
    case "applicationReject":
      title = "신청 거절";
      message = (
        <>
          현재 신청 중인 길동무를
          <br />
          거절하시겠습니까?
        </>
      );
      break;
      case "editingSuccess":
      title = "수정 완료";
      message = "모집글이 수정되었습니다.";
      break;
    default:
      break;
  }

  return (
    <>
      <ModalLayout
        modalType={modalType}
        modalTitle={title}
        modalMessage={message}
        onClose={onClose}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
}
