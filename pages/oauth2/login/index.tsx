import { useRouter } from "next/router";
import { useEffect } from "react";

import axios from "@/lib/api/axios";

export default function Oauth2Login() {
  const router = useRouter();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axios.get("/oauth2/login");

        const { oauth2Token } = response.data;
        document.cookie = `accessToken=${oauth2Token}; path=/; max-age=3600; secure; samesite=strict`;

        console.log("oauth2 토큰 저장 성공!");
        router.push("/");
      } catch (error) {
        console.error("oauth2 토큰 저장 실패", error);
      }
    };

    fetchLoginStatus();
  }, [router]);

  return (
    <div>
      <h1>Oauth2 Login...</h1>
    </div>
  );
}
