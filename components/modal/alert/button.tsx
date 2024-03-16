import { AlertType } from "@/components/modal/alert";
import { Button } from "@/components/ui/button";

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
    alertType === "writingSuccess" ||
    alertType === "emailInUse" ||
    alertType === "userProfile"
  ) {
    filledStyle = `text-18 h-52 mobile:h-44  ${alertType === "userProfile" ? "w-240 mobile:w-full" : "w-full"}`;
    filledText = "확인";
  } else if (
    alertType === "writingCancel" ||
    alertType === "travelApply" ||
    alertType === "travelCancle"
  ) {
    filledStyle = "w-full text-18 h-52 mobile:h-44";
    ghostStyle = "w-full text-18 h-52 mobile:h-44";
    filledText = "예";
    ghostText = "아니오";
  }

  return (
    <>
      {ghostStyle && ghostText ? (
        <div className="flex items-start justify-center gap-12 self-stretch">
          <Button variant={"outline"} className={ghostStyle} onClick={onClose}>
            {ghostText}
          </Button>
          <Button className={filledStyle} onClick={onClose}>
            {filledText}
          </Button>
        </div>
      ) : (
        <Button className={filledStyle} onClick={onClose}>
          {filledText}
        </Button>
      )}
    </>
  );
}
