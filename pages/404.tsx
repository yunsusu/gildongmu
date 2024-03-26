import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";

const Custom404: NextPage = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="flex min-w-full items-center justify-center"
    >
      <div className="h-334 flex w-240 flex-col items-center justify-center gap-32">
        <div className="relative h-160 w-240">
          <Image
            src="/icons/404image.png"
            alt="404이미지"
            fill
            className="absolute"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="text-2xl font-bold">길을 잃었어요!</div>
          <div className="text-lg font-bold">홈에서 다시 이동해 주세요</div>
        </div>
        <Button
          type="button"
          onClick={handleHome}
          className="h-52 w-160 px-16 py-10 text-18 font-extrabold tablet:h-44"
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
};

export default Custom404;
