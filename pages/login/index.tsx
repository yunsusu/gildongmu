// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";
import axiosInstance from "@/lib/api/axios";
import { regEmail, regPassword } from "@/lib/utils/regexp";

interface SocialSignUp {
  email: string;
  nickname: string;
  password: string;
  gender?: "MALE" | "FEMALE";
  dayOfBirth?: string;
  favoriteSpots?: string[];
  bio?: string;
}

export default function Login() {
  const router = useRouter();
  const [loginErrorModal, setLoginErrorModal] = useState(false);
  const [eye, setEye, toggleEye] = useToggle(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onBlur", // 포커스 아웃 시 유효성 검사
    criteriaMode: "all", // 모든 유효성 검사 규칙 체크
    reValidateMode: "onBlur", // 포커스 아웃 시 재검증
  });

  // 카카오 로그인
  const kakaoClientName = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientName}&redirect_uri=${kakaoRedirectUri}&response_type=code`;

  // 구글 로그인
  const googleClientName = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${googleClientName}&redirect_uri=${googleRedirectUri}&scope=https://www.googleapis.com/auth/userinfo.email`;

  // const provider = new GoogleAuthProvider();

  // 인풋이 비어있지 않을 때 로그인 버튼 활성화
  const email = watch("email");
  const password = watch("password");
  const isFormEmpty = !email || !password;

  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      console.log("로그인 성공", response.data);

      const { accessToken } = response.data;
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; secure; samesite=strict`;

      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setLoginErrorModal(true);
      }

      console.log("로그인 실패", error.message);
    }
  };

  // const google = () => {
  //   const auth = getAuth();
  //   signInWithRedirect(auth, provider)
  //     .then(result => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     })
  //     .catch(error => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  useEffect(() => {
    // 에러 처리 로직 (토큰 만료, 서버 응답 없음 등)
    // 로그인 인증이 안 되어 있을 때 회원가입으로 이동
    const handleSocialLogin = async () => {
      const authCode = new URL(window.location.href).searchParams.get("code");

      if (authCode) {
        try {
          const formData = new FormData();
          formData.append("code", authCode);

          const response = await axiosInstance.post(
            `/oauth2/authorization/google`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          console.log("소설로그인 성공", response.data);
          router.push("/");
        } catch (error) {
          console.log("소셜로그인 실패:", error);
        }
      }
    };

    // URL에서 인증 코드 추출

    // if (authCode) {
    //   // 인증 코드가 있으면 백엔드로 전송
    //   sendDataToServer(authCode);
    // }
    handleSocialLogin();
  }, [router]);

  return (
    <>
      {loginErrorModal ? (
        <Modal
          modalType={"emailNotFound"}
          onClose={() => setLoginErrorModal(false)}
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
                  className={`flex h-52 w-full items-center justify-end gap-8 self-stretch rounded-xl bg-bg-02 px-16 ${errors.email ? "bg-rose-50" : ""}`}
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
                  className={`flex h-52 w-full items-center justify-end gap-8 self-stretch rounded-xl bg-bg-02 px-16 ${errors.password ? "bg-rose-50" : ""}`}
                />
                <Image
                  src={eye ? "/icons/eye-off.png" : "/icons/eye-on.png"}
                  alt="eye"
                  width="24"
                  height="24"
                  className="absolute right-16 top-14 cursor-pointer"
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
                  disabled={isFormEmpty}
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
              <p className="flex w-1/3 justify-center text-16 font-bold leading-[130%] tracking-[-0.6px] text-text-01">
                SNS 로그인
              </p>
              <div className="w-1/3 border-b border-line-01"></div>
            </div>

            <div className="flex w-full items-center justify-between text-18">
              <Link href={KAKAO_AUTH_URL} className="mr-20 w-1/2">
                <Button
                  variant="destructive"
                  className="hover:bg-curent h-52 w-full bg-kakao text-text-02"
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
              </Link>

              <Link href={GOOGLE_AUTH_URL} className="w-1/2">
                <Button
                  variant="destructive"
                  className="hover:bg-curent h-52 w-full bg-bg-02 text-text-02"
                >
                  <Image
                    src="/icons/google.png"
                    alt="google"
                    width={32}
                    height={32}
                    className="pr-8"
                  />
                  구글
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
