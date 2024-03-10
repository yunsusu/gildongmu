import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Dropdown from "@/components/Gnb/Dropdown";

function Gnb() {
  const [loginState, setLoginState] = useState(true);
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(prev => !prev);
  };

  return (
    <div className="bg-white">
      <nav className="flex max-w-[1200px] h-72 justify-between items-center py-5 px-6 mx-auto bg-white relative">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="w-120 h-30 relative overflow-hidden ">
            <Image
              src={"/images/logo.png"}
              alt="로고"
              fill
              className="object-cover"
            />
          </Link>
          <Link href={"/travel"} className="text-18 px-4 hover:text-teal-500">
            여행
          </Link>
          <Link
            href={"/community"}
            className="text-18 px-4 hover:text-teal-500"
          >
            소통공간
          </Link>
          {loginState && (
            <Link
              href={"/mytravel"}
              className="text-18 px-4 hover:text-teal-500"
            >
              내 여행
            </Link>
          )}
        </div>

        {!loginState ? (
          <div className="flex w-137 h-40 text-16 justify-center items-center px-4 py-2.5 text-teal-500 border-[1.5px] rounded-[24px] border-teal-500">
            <Link href={"/login"}>로그인</Link>/
            <Link href={"/signup"}>회원가입</Link>
          </div>
        ) : (
          <div
            onClick={handleDropDown}
            className="text-18 flex items-center cursor-pointer"
          >
            야돈 님
          </div>
        )}
        {dropDown && <Dropdown />}
      </nav>
    </div>
  );
}

export default Gnb;
