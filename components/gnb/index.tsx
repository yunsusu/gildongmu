import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Dropdown from "@/components/dropdown";
import Hammenu from "@/components/gnb/Hammenu";
import useToggle from "@/hooks/useToggle";
import useGnbStore from "@/store/gnb";

function Gnb() {
  const [loginState, setLoginState] = useState(true);
  const [dropDown, setDropDown, handleDropDown] = useToggle();
  const [hamMenu, setHamMenu, handleHamMenu] = useToggle(false);
  const [isTablet, setIsTablet] = useToggle(true);
  const { gnbColor } = useGnbStore();

  const gnbs = [
    {
      name: "마이페이지",
      link: "/mypage",
      handleBtn: () => {},
    },
    {
      name: "로그아웃",
      link: "",
      handleBtn: () => {},
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1199);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsTablet]);

  return (
    <div className="relative bg-white font-bold tracking-tight text-text-01">
      <nav className="relative z-30 mx-auto flex h-72 max-w-[1200px] items-center justify-between bg-white px-24 py-20 tablet:h-60">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="relative h-30 w-120 overflow-hidden ">
            <Image
              src={"/images/logo.svg"}
              alt="로고"
              fill
              className="object-cover"
              priority={true}
            />
          </Link>
          <Link
            href="/travel"
            className={`px-4 text-18 tablet:hidden ${gnbColor === "travel" && "text-blue-400"} ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"}`}
          >
            여행
          </Link>
          <Link
            href={"/community"}
            className={`px-4 text-18 ${gnbColor === "community" && "text-primary-press"} ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} tablet:hidden `}
          >
            소통공간
          </Link>
          {loginState && (
            <Link
              href={"/mytravel"}
              className={`px-4 text-18 ${gnbColor === "mytravel" && "text-primary-press"} ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} tablet:hidden `}
            >
              내 여행
            </Link>
          )}
        </div>

        {!isTablet ? (
          !loginState ? (
            <div className="flex h-40 w-137 items-center justify-center rounded-[24px] border-[1.5px] border-teal-500 px-4 py-2.5 text-16 text-teal-500 hover:border-primary-press">
              <Link href={"/login"} className="hover:text-primary-press">
                로그인
              </Link>
              /
              <Link href={"/signup"} className="hover:text-primary-press">
                회원가입
              </Link>
            </div>
          ) : (
            <div
              onClick={handleDropDown}
              className="flex cursor-pointer items-center text-18"
            >
              야돈 님 &nbsp;
              <div className="relative h-16 w-16">
                <Image
                  src={"/icons/chevron-down.svg"}
                  alt="드롭다운 버튼"
                  fill
                  className={dropDown ? "rotate-180" : ""}
                />
              </div>
            </div>
          )
        ) : (
          <div
            onClick={handleHamMenu}
            className="relative h-24 w-24 cursor-pointer"
          >
            <Image
              src={!hamMenu ? "/icons/menu.svg" : "/icons/close.svg"}
              alt="햄버거메뉴"
              fill
              className="object-cover"
            />
          </div>
        )}

        {dropDown && (
          <Dropdown
            gnbColor={gnbColor}
            buttons={gnbs}
            handleDropDown={handleDropDown}
          />
        )}
      </nav>

      {isTablet && (
        <div
          style={{ pointerEvents: hamMenu ? "auto" : "none" }}
          className="absolute top-0 z-20 h-screen w-full overflow-hidden"
        >
          <Hammenu
            loginState={loginState}
            hamMenu={hamMenu}
            gnbColor={gnbColor}
          />
        </div>
      )}
      <div className="absolute bottom-0 z-20 h-1 w-full bg-line-02"></div>
    </div>
  );
}

export default Gnb;
