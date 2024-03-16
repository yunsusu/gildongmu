import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import AlertModal from "@/components/modal/alert";
import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import { regEmail, regPassword } from "@/lib/utils/regexp";

export default function Login() {
  const [loginErrorModal, setLoginErrorModal] = useState(false);
  const [eye, setEye, toggleEye] = useToggle(true);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onBlur", // 포커스 아웃 시 유효성 검사
    criteriaMode: "all", // 모든 유효성 검사 규칙 체크
    reValidateMode: "onBlur", // 포커스 아웃 시 재검증
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("http://3.38.76.39:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (response.ok) {
        window.location.href = "/";
      }
    } catch (error: any) {
      if (error.status === 401) {
        setLoginErrorModal(true);
      }

      console.log(error.message);
    }
  };

  return (
    <>
      {loginErrorModal ? (
        <AlertModal
          alertType={"emailNotFound"}
          onClose={() => setLoginErrorModal(true)}
        />
      ) : null}
      <div className="flex" style={{ height: "calc(100vh - 72px)" }}>
        <div className="h-full w-1/2 bg-kakao text-50 tablet:hidden"></div>
        <div className="flex h-full w-1/2 items-center justify-center bg-bg-06 text-14 tablet:w-full">
          <div className="flex h-5/6 max-h-[617px] w-[434px] flex-col items-center rounded-32 bg-white p-40 tablet:mt-[81.5px] mobile:mx-24 mobile:mt-[50.5px] mobile:w-full">
            <h1 className="mb-40 text-32 font-extrabold text-text-01">
              로그인
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="relative mb-12 w-full">
                <input
                  id="email"
                  type="email"
                  placeholder="이메일"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: regEmail,
                      message: "올바른 이메일을 입력해주세요.",
                    },
                  })}
                  className="flex h-52 w-full items-center justify-end gap-8 self-stretch rounded-xl bg-bg-02 px-16"
                />
                <p className="ml-12 mt-4 text-system-error">
                  {errors.email?.message}
                </p>
              </div>
              <div className="relative w-full">
                <input
                  id="password"
                  type={eye ? "password" : "text"}
                  placeholder="비밀번호"
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: regPassword,
                      message: "올바른 비밀번호를 입력해주세요.",
                    },
                  })}
                  className="flex h-52 w-full items-center justify-end gap-8 self-stretch rounded-xl bg-bg-02 px-16"
                />
                <Image
                  src={eye ? "/icons/eye-off.png" : "/icons/eye-on.png"}
                  alt="eye"
                  width="24"
                  height="24"
                  className="absolute right-16 top-16"
                  onClick={toggleEye}
                />
                <p className="mb-12 ml-12 mt-4 text-system-error">
                  {errors.password?.message}
                </p>
              </div>
              <div className="mt-24 w-full text-18">
                <Button
                  type="submit"
                  variant="ghost"
                  className="h-52 w-full bg-primary text-primary-foreground hover:bg-primary-press"
                  disabled={!isValid}
                >
                  로그인
                </Button>
              </div>
            </form>

            <Link href="/signup" className="mb-40 mt-20 w-full text-18">
              <Button
                variant="ghost"
                className="h-52 w-full border-[1.5px] !text-primary hover:bg-primary-press hover:!text-primary-foreground"
              >
                회원 가입하기
              </Button>
            </Link>

            <div className="mb-32 flex w-full items-center justify-center">
              <div className="w-1/3 border-b border-line-01"></div>
              <p className="flex w-1/3 justify-center text-16 leading-[130%] tracking-[-0.6px] text-text-01">
                SNS 로그인
              </p>
              <div className="w-1/3 border-b border-line-01"></div>
            </div>

            <div className="flex w-full items-center justify-between text-18">
              <Button
                variant="destructive"
                className="hover:bg-curent mr-20 h-52 w-1/2 bg-kakao text-text-02"
              >
                <Image
                  src="/icons/kakao.png"
                  alt="kakao"
                  width={32}
                  height={32}
                  className="pr-8"
                />
                카카오톡
              </Button>
              <Button
                variant="destructive"
                className="hover:bg-curent h-52 w-1/2 bg-bg-02 text-text-02"
              >
                <Image
                  src="/icons/google.png"
                  alt="google"
                  width="32"
                  height="32"
                  className="pr-8"
                />
                구글
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
