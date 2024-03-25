import Image from "next/image";
import { useState } from "react";

export default function Favor() {
  const [favor, setFavor] = useState(true);

  return (
    <>
      {favor ? (
        <div
          className="relative h-24 w-24 cursor-pointer"
          onClick={() => setFavor(false)}
        >
          <Image src={"/icons/heartOn.svg"} alt="하트 아이콘" fill />
        </div>
      ) : (
        <div
          className="relative h-24 w-24 cursor-pointer"
          onClick={() => setFavor(true)}
        >
          <Image src={"/icons/heartOff.svg"} alt="빈하트 아이콘" fill />
        </div>
      )}
    </>
  );
}
