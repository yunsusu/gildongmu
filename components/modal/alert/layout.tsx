import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AlertType } from "@/components/modal/alert";
import AlertModalButton from "@/components/modal/alert/button";

interface AlertModalLayoutProps {
  alertMessage: string | ReactNode;
  alertTitle: string;
  alertType: AlertType;
  onClose: () => void;
}

export default function AlertModalLayout({
  alertMessage,
  alertTitle,
  alertType,
  onClose,
}: AlertModalLayoutProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const body = document.body;
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    body.appendChild(modalRoot);
    setPortalRoot(modalRoot);
    return () => {
      body.removeChild(modalRoot);
    };
  }, []);

  return (
    portalRoot &&
    createPortal(
      <div className="fixed inset-0 z-30 flex h-full w-full items-center justify-center bg-dim-60">
        <div
          className={`flex flex-col items-center overflow-x-hidden rounded-32 bg-white shadow-md ${alertType === "userProfile" ? "relative w-[480px] gap-24 px-24 py-32 mobile:w-320" : "moblie:px-24 w-360 gap-32 px-40 py-48 mobile:w-288 mobile:gap-24 mobile:py-32"}`}
        >
          {alertType === "userProfile" && (
            <button className="absolute right-25 top-17" onClick={onClose}>
              <Image
                src={"/icons/close.svg"}
                alt="프로필 이미지"
                width={24}
                height={24}
              />
            </button>
          )}
          <span className="leading-32 font-NanumSquareRound text-center text-20 font-bold text-text-01 mobile:text-18">
            {alertTitle}
          </span>
          <span className="font-NanumSquareRound text-center text-18 font-normal leading-relaxed tracking-tight text-text-02 mobile:text-16">
            {alertMessage}
          </span>
          <AlertModalButton alertType={alertType} onClose={onClose} />
        </div>
      </div>,
      document.body,
    )
  );
}
