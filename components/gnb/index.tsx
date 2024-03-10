import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Gnb() {
  const [loginState, setLoginState] = useState(true);
  return (
    <div className="bg-white">
      <nav className="flex max-w-[1200px] h-[72px] justify-between py-5 px-6 mx-auto bg-white">
        <div className="flex items-center gap-6">
          <Link
            href={"/"}
            className="w-[120px] h-[30px] relative overflow-hidden "
          >
            <Image
              src={"/images/logo.png"}
              alt="로고"
              fill
              className="object-cover"
            />
          </Link>
          <Link
            href={"/travel"}
            className="text-[18px] px-4 hover:text-green-400"
          >
            여행
          </Link>
          <Link
            href={"/community"}
            className="text-[18px] px-4 hover:text-green-400"
          >
            소통공간
          </Link>
          {loginState && (
            <Link
              href={"/mytravel"}
              className="text-[18px] px-4 hover:text-green-400"
            >
              내 여행
            </Link>
          )}
        </div>

        {!loginState ? (
          <div className="flex h-10 text-[16px] justify-center items-center px-4 py-2.5 text-green-400 border-[1.5px] rounded-[24px] border-green-400">
            <Link href={"/login"}>로그인</Link>/
            <Link href={"/signup"}>회원가입</Link>
          </div>
        ) : (
          <div className="text-[18px] flex items-center cursor-pointer">
            야돈 님
          </div>
        )}
      </nav>
    </div>
  );
}

export default Gnb;
