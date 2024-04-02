import { useRouter } from "next/router";
import { useState } from "react";

import SocialSignUpForm from "@/components/form/socialSignupForm";
import axiosInstance from "@/lib/api/axios";

export default function Oauth2Signup() {
  const router = useRouter();
  const [mail, setEmail] = useState("");

  const getOauthEmail = async () => {
    try {
      const response = await axiosInstance.get("/oauth2/signup", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "access-control-allow-credentials": "true",
          "Content-Type": "application/json",
        },
      });
      setEmail(response.data.email);

      console.log("oauth2 이메일 조회 성공! ", response.data);
    } catch (error) {
      console.error("oauth2 이메일 조회 실패", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-bg-06 pb-80">
      <h1 className="flex h-120 items-center text-32 font-extrabold text-text-01 tablet:h-100 tablet:text-24">
        회원 정보 추가 입력
      </h1>
      <p className="text-14 text-text-02">email: {mail}</p>
      <button onClick={getOauthEmail}>getOauthEmail</button>
      <SocialSignUpForm />
    </div>
  );
}
