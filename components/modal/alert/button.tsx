import { AlertType } from "@/components/modal/alert";

interface AlertModalButtonProps {
  alertType: AlertType;
  onClose: () => void;
}

export default function AlertModalButton({
  alertType,
  onClose,
}: AlertModalButtonProps) {
  let style: string = "";
  let text: string = "";

  if (
    alertType === "emailNotFound" ||
    alertType === "passwordMismatch" ||
    alertType === "signupSuccess" ||
    alertType === "emailInUse"
  ) {
    style =
      "flex items-center self-stretch justify-center w-full gap-4 px-16 py-10 h-52 mobile:h-44 min-w-320 rounded-32 bg-primary text-white text-center font-NanumSquareRound text-16 font-extrabold leading-22";
    text = "확인";
  }

  return (
    <button className={style} onClick={onClose}>
      {text}
    </button>
  );
}
