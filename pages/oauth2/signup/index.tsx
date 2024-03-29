import { useRouter } from "next/router";
import { useEffect } from "react";

import SocialSignUpForm from "@/components/form/socialSignupForm";
import axios from "@/lib/api/axios";

export default function Oauth2Signup() {
  const router = useRouter();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axios.get("/oauth2/siginup");
        const oauth2Email = response.data.email;

        console.log("oauth2 이메일 조회 성공! ", response.data);
      } catch (error) {
        console.error("oauth2 이메일 조회 실패", error);
      }
    };

    fetchLoginStatus();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-start bg-bg-06 pb-80">
      <h1 className="flex h-120 items-center text-32 font-extrabold text-text-01 tablet:h-100 tablet:text-24">
        회원 추가 정보
      </h1>
      <SocialSignUpForm />
    </div>
  );
}
