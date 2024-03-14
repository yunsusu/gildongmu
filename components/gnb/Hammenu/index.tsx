import Image from "next/image";
import Link from "next/link";

interface LoginState {
  loginState: boolean;
  hamMenu: boolean;
  handleHamMenu: () => void;
  gnbColor: string;
}

function Hammenu({ loginState, hamMenu, handleHamMenu, gnbColor }: LoginState) {
  return (
    <div
      style={
        hamMenu
          ? { transform: "translateX(0%)" }
          : { transform: "translateX(100%)" }
      }
      className="w-5/12 h-screen absolute top-0 z-0 bg-white right-0 mobile:w-full transition-all duration-700"
      onClick={handleHamMenu}
    >
      <div className="w-full h-72"></div>
      <div className="flex flex-col p-24">
        {!loginState ? (
          <div className="flex w-full h-40 text-16 justify-center items-center px-4 py-2.5 text-teal-500 border-[1.5px] rounded-[24px] border-teal-500 font-extrabold hover:border-primary-press">
            <Link href={"/login"} className="hover:text-primary-press">
              로그인
            </Link>{" "}
            &nbsp;/&nbsp;
            <Link href={"/signup"} className="hover:text-primary-press">
              회원가입
            </Link>
          </div>
        ) : (
          <div className="flex gap-12 items-center">
            <div className="w-36 h-36 overflow-hidden rounded-full relative">
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
          className={`w-max mt-32 text-16 ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"}`}
        >
          <Link href={"/travel"}>여행</Link>
        </div>
        <div
          className={`w-max mt-20 text-16 ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"}`}
        >
          <Link href={"/community"}>소통공간</Link>
        </div>
        {loginState && (
          <div
            className={`w-max mt-20 text-16 ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"}`}
          >
            <Link href={"/community"}>내 여행</Link>
          </div>
        )}
      </div>
      {loginState && (
        <div className="w-full mb-32 pt-24 absolute bottom-0 px-24">
          <Link
            href={"/mypage"}
            className={`${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} py-4 cursor-pointer text-16`}
          >
            마이페이지
          </Link>
          <div
            className={`w-max ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} py-4 cursor-pointer text-16 mt-12`}
          >
            로그아웃
          </div>
          <div className="w-11/12 border-t border-line-03 absolute top-0 left-1/2 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
}

export default Hammenu;
