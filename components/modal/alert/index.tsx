import { ReactNode } from "react";

import AlertModalLayout from "@/components/modal/alert/layout";

export type AlertType =
  | "emailNotFound"
  | "passwordMismatch"
  | "signupSuccess"
  | "emailInUse"
  | "writingCancel";

interface AlertModalProps {
  alertType: AlertType;
  onClose: () => void;
}

export default function AlertModal({ alertType, onClose }: AlertModalProps) {
  let title: string = "";
  let message: string | ReactNode = "";

  switch (alertType) {
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
    default:
      break;
  }

  return (
    <>
      <AlertModalLayout
        alertType={alertType}
        alertTitle={title}
        alertMessage={message}
        onClose={onClose}
      />
    </>
  );
}
