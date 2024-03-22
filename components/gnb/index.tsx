import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import Dropdown from "@/components/dropdown";
import Hammenu from "@/components/gnb/Hammenu";
import useToggle from "@/hooks/useToggle";
import useGnbStore from "@/store/gnb";

function Gnb() {
  const [loginState, setLoginState] = useState(true);
  const [dropDown, setDropDown, handleDropDown] = useToggle();
  const [hamMenu, setHamMenu, handleHamMenu] = useToggle(false);
  const [isTablet, setIsTablet] = useToggle(true);
  const [gnb, setGnb] = useState("hover:text-primary-press");
  const { gnbColor } = useGnbStore();

  const ref = useRef<HTMLDivElement>(null);

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
    if (gnbColor === "travel") {
      setGnb("hover:text-blue-400");
    } else if (gnbColor === "community") {
      setGnb("hover:text-blue-400");
    } else if (gnbColor === "mytravel") {
      setGnb("hover:text-indigo-500");
    }
  }, [gnbColor]);

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

  useEffect(() => {
    const handleWheel = (event: { deltaY: any }) => {
      setHamMenu(false);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [setHamMenu]);

  useOnClickOutside(ref, () => {
    dropDown && handleDropDown();
  });
  return (
    <div className="relative border-b border-line-02 bg-white font-bold tracking-tight text-text-01">
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
            className={`px-4 text-18 tablet:hidden ${gnbColor === "travel" && "text-blue-400"} ${gnb}`}
          >
            여행
          </Link>
          <Link
            href={"/community"}
            className={`px-4 text-18 ${gnbColor === "community" && "text-primary-press"} ${gnb} tablet:hidden`}
          >
            소통공간
          </Link>
          {loginState && (
            <Link
              href={"/mytravel"}
              className={`px-4 text-18 ${gnbColor === "mytravel" && "text-indigo-500"} ${gnb} tablet:hidden `}
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
            <div ref={ref} className="relative">
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
              {dropDown && (
                <Dropdown buttons={gnbs} handleDropDown={handleDropDown} />
              )}
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
      </nav>

      {isTablet && (
        <div
          style={{ pointerEvents: hamMenu ? "auto" : "none" }}
          className="fixed top-0 z-20 h-full w-full overflow-hidden"
          onClick={handleHamMenu}
        >
          <Hammenu
            loginState={loginState}
            hamMenu={hamMenu}
            gnbColor={gnbColor}
          />
        </div>
      )}
    </div>
  );
}

export default Gnb;
