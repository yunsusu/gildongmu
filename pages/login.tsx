import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <>
      <div className="flex" style={{ height: "calc(100vh - 72px" }}>
        <div className="bg-kakao w-1/2 h-full text-50 tablet:hidden"></div>
        <div className="bg-bg-06 w-1/2 h-full text-14 flex justify-center tablet:w-full">
          <div className="bg-white w-[434px] h-5/6 max-h-[617px] p-40 mt-[65.5px] flex flex-col justify-between items-center rounded-32 tablet:mt-[81.5px] mobile:w-full mobile:mx-24 mobile:mt-[50.5px]">
            <h1 className="text-32 text-text-01 font-extrabold">로그인</h1>
            <ul className="w-full">
              <li className="w-full mb-32">
                <input
                  type="text"
                  placeholder="이메일"
                  className="bg-bg-02 w-full h-52 flex justify-end items-center self-stretch px-16 gap-8 rounded-xl"
                />
              </li>
              <li className="w-full">
                <input
                  type="text"
                  placeholder="비밀번호"
                  className="bg-bg-02 w-full h-52 flex justify-end items-center self-stretch px-16 gap-8 rounded-xl"
                />
              </li>
            </ul>
            <div className="w-full text-18">
              <Button className="bg-line-02 text-text-04 font-extrabold w-full h-52 mb-20 rounded-32">
                로그인
              </Button>
              <Button className="bg-white border-[1.5px] border-primary font-extrabold text-primary w-full h-52 rounded-32">
                회원 가입하기
              </Button>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="border-b border-line-01 w-1/3"></div>
              <p className="text-text-01 text-16 w-1/3 flex justify-center leading-[130%] tracking-[-0.6px]">
                SNS 로그인
              </p>
              <div className="border-b border-line-01 w-1/3"></div>
            </div>
            <div className="w-full flex justify-between items-center text-18">
              <Button className="bg-kakao mr-20 w-1/2 h-52 flex justify-center text-text-02 rounded-32">
                <Image
                  src="/icons/kakao.png"
                  alt="kakao"
                  width="32"
                  height="32"
                  className="pr-8"
                />
                카카오톡
              </Button>
              <Button className="bg-bg-02 w-1/2 h-52 flex justify-center text-text-02 rounded-32">
                <Image
                  src="/icons/google.png"
                  alt="google"
                  width="32"
                  height="32"
                  className="pr-8"
                />
                구글
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
