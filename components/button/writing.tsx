import Image from "next/image";
import Link from "next/link";

export default function WritingButton() {
  return (
    <Link href={"/write"}>
      <div className="fixed bottom-40 right-40 tablet:right-20 flex items-center justify-center p-12 gap-10 rounded-full animate-bounce bg-white shadow-md w-64 h-64 tablet:w-56 tablet:h-56">
        <Image
          src={"/icons/pencil.svg"}
          width={40}
          height={40}
          alt="연필 아이콘"
        />
      </div>
    </Link>
  );
}
