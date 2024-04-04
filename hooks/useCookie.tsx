import { useEffect, useState } from "react";

function useCookie(name: string) {
  const [cookie, setCookie] = useState(null);

  useEffect(() => {
    const checkCookieChange = () => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)"),
      );
      const cookieValue: string | any = match ? match[2] : null;

      if (cookie !== cookieValue) {
        setCookie(cookieValue);
      }
    };

    // 초기 쿠키 값 설정
    checkCookieChange();

    // 주기적으로 쿠키 변경 체크
    const intervalId = setInterval(checkCookieChange, 1000);

    return () => clearInterval(intervalId);
  }, [name, cookie]);

  return cookie;
}
export default useCookie;
