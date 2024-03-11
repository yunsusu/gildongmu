import Image from "next/image";
import Link from "next/link";

interface LoginState {
  loginState: boolean;
  hamMenu: boolean;
}

function Hammenu({ loginState, hamMenu }: LoginState) {
  return (
    <div
      // style={hamMenu ? { right: "0px" } : { right: "-100%" }}
      className="w-5/12 h-screen absolute top-0 z-0 bg-white right-0 mobile:w-full transition-all duration-1000"
    >
      <div className="w-full h-72"></div>
      <div className="flex flex-col p-24">
        {!loginState ? (
          <div className="flex w-full h-40 text-16 justify-center items-center px-4 py-2.5 text-teal-500 border-[1.5px] rounded-[24px] border-teal-500">
            <Link href={"/login"}>로그인</Link> &nbsp;/&nbsp;
            <Link href={"/signup"}>회원가입</Link>
          </div>
        ) : (
          <div className="flex gap-12 items-center">
            <div className="w-36 h-36 overflow-hidden rounded-full relative">
              <Image
                src={"/images/logo.png"}
                alt="유저 프로필"
                fill
                className="object-cover"
              />
            </div>
            야돈 님
          </div>
        )}
        <div className="w-max mt-32 text-16 hover:text-teal-500">
          <Link href={"/travel"}>여행</Link>
        </div>
        <div className="w-max mt-20 text-16 hover:text-teal-500">
          <Link href={"/community"}>소통공간</Link>
        </div>
        {loginState && (
          <div className="w-max mt-20 text-16 hover:text-teal-500">
            <Link href={"/community"}>내 여행</Link>
          </div>
        )}
      </div>
      {loginState && (
        <div className="w-full mb-32 pt-24 border-t border-line-03 absolute bottom-0 px-24">
          <Link
            href={"/mypage"}
            className=" hover:text-teal-500 py-4 cursor-pointer text-16"
          >
            마이페이지
          </Link>
          <div className="w-max hover:text-teal-500 py-4 cursor-pointer text-16 mt-12">
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
}

export default Hammenu;
