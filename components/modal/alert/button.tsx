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
    alertType === "emailInUse"
  ) {
    filledStyle = "w-full text-18";
    filledText = "확인";
  } else if (alertType === "writingCancel") {
    filledStyle = "w-full text-18";
    ghostStyle = "w-full text-18";
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
