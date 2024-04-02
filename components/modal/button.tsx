import { ModalType } from "@/components/modal";
import { Button } from "@/components/ui/button";

interface ModalButtonProps {
  modalType: ModalType;
  onClose?: () => void;
  onApprove?: () => void;
}

export default function ModalButton({
  modalType,
  onClose,
  onApprove,
}: ModalButtonProps) {
  let filledStyle: string = "";
  let ghostStyle: string = "";
  let filledText: string = "";
  let ghostText: string = "";

  if (
    modalType === "emailNotFound" ||
    modalType === "passwordMismatch" ||
    modalType === "signupSuccess" ||
    modalType === "writingSuccess" ||
    modalType === "emailInUse" ||
    modalType === "userProfile" ||
    modalType === "profileEdit"
  ) {
    filledStyle = `text-18 h-52 mobile:h-44  ${modalType === "userProfile" ? "w-240 mobile:w-full" : "w-full"}`;
    filledText = "확인";
  } else if (
    modalType === "writingCancel" ||
    modalType === "writingDelete" ||
    modalType === "travelApply" ||
    modalType === "travelCancle" ||
    modalType === "memberExile" ||
    modalType === "deleteComment"
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
          <Button className={filledStyle} onClick={onApprove}>
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
