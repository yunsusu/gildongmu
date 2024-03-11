import { AlertType } from "@/components/modal/alert";

interface AlertModalButtonProps {
  alertType: AlertType;
  onClose: () => void;
}

export default function AlertModalButton({
  alertType,
  onClose,
}: AlertModalButtonProps) {
  let filledStyle: string = "";
  let ghostStyle: string = "";
  let filledText: string = "";
  let ghostText: string = "";

  if (
    alertType === "emailNotFound" ||
    alertType === "passwordMismatch" ||
    alertType === "signupSuccess" ||
    alertType === "emailInUse"
  ) {
    filledStyle =
      "flex items-center self-stretch justify-center w-full gap-4 px-16 py-10 h-52 mobile:h-44 min-w-320 rounded-32 bg-primary text-white text-center font-NanumSquareRound text-18 mobile:text-16 font-extrabold leading-22";
    filledText = "확인";
  } else if (alertType === "writingCancel") {
    filledStyle =
      "flex h-52 w-full px-16 py-10 justify-center bg-primary items-center gap-4 rounded-32 text-primary text-center font-NanumSquareRound text-white text-18 mobile:text-16 font-extrabold leading-22";
    ghostStyle =
      "flex h-52 w-full px-16 py-10 justify-center items-center gap-4 rounded-32 border-[1.5px] border-primary text-primary text-center font-NanumSquareRound text-18 mobile:text-16 font-extrabold leading-22";
    filledText = "예";
    ghostText = "아니오";
  }

  return (
    <>
      {ghostStyle && ghostText ? (
        <div className="flex items-start self-stretch justify-center gap-12">
          <button className={ghostStyle} onClick={onClose}>
            {ghostText}
          </button>
          <button className={filledStyle} onClick={onClose}>
            {filledText}
          </button>
        </div>
      ) : (
        <button className={filledStyle} onClick={onClose}>
          {filledText}
        </button>
      )}
    </>
  );
}
