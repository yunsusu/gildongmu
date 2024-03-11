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
      <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-dim-60">
        <div className="flex flex-col items-center gap-32 px-40 py-48 overflow-x-hidden bg-white shadow-md mobile:gap-24 w-360 mobile:w-288 rounded-32 moblie:px-24 mobile:py-32">
          <span className="font-bold text-center text-text-01 leading-32 text-20 mobile:text-18 font-NanumSquareRound">
            {alertTitle}
          </span>
          <span className="font-normal leading-relaxed tracking-tight text-center text-18 mobile:text-16 text-text-02 font-NanumSquareRound">
            {alertMessage}
          </span>
          <AlertModalButton alertType={alertType} onClose={onClose} />
        </div>
      </div>,
      document.body,
    )
  );
}
