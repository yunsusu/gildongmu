import Image from "next/image";
import Link from "next/link";

interface LoginState {
  loginState: boolean;
  hamMenu: boolean;
  gnbColor: string;
}

function Hammenu({ loginState, hamMenu, gnbColor }: LoginState) {
  return (
    <div
      style={
        hamMenu
          ? { transform: "translateX(0%)" }
          : { transform: "translateX(100%)" }
      }
      className="absolute right-0 top-0 z-0 h-full w-5/12 bg-white transition-all duration-700 mobile:w-full"
    >
      <div className="h-72 w-full"></div>
      <div className="flex flex-col p-24">
        {!loginState ? (
          <div className="flex h-40 w-full items-center justify-center rounded-[24px] border-[1.5px] border-teal-500 px-4 py-2.5 text-16 font-extrabold text-teal-500 hover:border-primary-press">
            <Link href={"/login"} className="hover:text-primary-press">
              로그인
            </Link>{" "}
            &nbsp;/&nbsp;
            <Link href={"/signup"} className="hover:text-primary-press">
              회원가입
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-12">
            <div className="relative h-36 w-36 overflow-hidden rounded-full">
              <Image
                src={"/images/logo.svg"}
                alt="유저 프로필"
                fill
                className="object-cover"
              />
            </div>
            야돈 님
          </div>
        )}
        <div
          className={`mt-32 w-max text-16 ${gnbColor === "travel" && "text-blue-400"} ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"}`}
        >
          <Link href={"/travel"}>여행</Link>
        </div>
        <div
          className={`mt-20 w-max text-16 ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"}`}
        >
          <Link href={"/community"}>소통공간</Link>
        </div>
        {loginState && (
          <div
            className={`mt-20 w-max text-16 ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"}`}
          >
            <Link href={"/community"}>내 여행</Link>
          </div>
        )}
      </div>
      {loginState && (
        <div className="absolute bottom-0 mb-32 w-full px-24 pt-24">
          <Link
            href={"/mypage"}
            className={`${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} cursor-pointer py-4 text-16`}
          >
            마이페이지
          </Link>
          <div
            className={`w-max ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} mt-12 cursor-pointer py-4 text-16`}
          >
            로그아웃
          </div>
          <div className="absolute left-1/2 top-0 w-11/12 -translate-x-1/2 border-t border-line-03"></div>
        </div>
      )}
    </div>
  );
}

export default Hammenu;
