import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "usehooks-ts";

import { ModalType } from "@/components/Modal";
import ModalButton from "@/components/Modal/Button";

interface ModalLayoutProps {
  modalMessage: string | ReactNode;
  modalTitle: string;
  modalType: ModalType;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ModalLayout({
  modalMessage,
  modalTitle,
  modalType,
  onClose,
  onConfirm,
  onCancel,
}: ModalLayoutProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const body = document.body;
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    body.appendChild(modalRoot);
    setPortalRoot(modalRoot);
    return () => {
      body.removeChild(modalRoot);
      document.body.style.overflow = "auto";
    };
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => onClose());

  return (
    portalRoot &&
    createPortal(
      <div className="fixed inset-0 z-30 flex h-full w-full items-center justify-center bg-dim-60">
        <div
          ref={ref}
          className={`flex flex-col items-center overflow-x-hidden rounded-32 bg-white shadow-md ${modalType === "userProfile" ? "relative w-[480px] gap-24 px-24 py-32 mobile:w-320" : "moblie:px-24 w-360 gap-32 px-40 py-48 mobile:w-288 mobile:gap-24 mobile:py-32"}`}
        >
          {modalType === "userProfile" && (
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
            {modalTitle}
          </span>
          <span className="font-NanumSquareRound text-center text-18 font-normal leading-relaxed tracking-tight text-text-02 mobile:text-16">
            {modalMessage}
          </span>
          <ModalButton
            modalType={modalType}
            onClose={onClose}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </div>
      </div>,
      document.body,
    )
  );
}
