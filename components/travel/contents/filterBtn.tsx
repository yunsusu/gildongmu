import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface filterBtnProps {
  text: string;
}
function FilterBtn({ text }: filterBtnProps) {
  const [choice, setChoice] = useState("bg-blue-200");

  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    if (search === undefined && text === "전체") {
      setChoice("bg-yellow-300");
    } else if (search === text) {
      setChoice("bg-yellow-300");
    } else {
      setChoice("bg-blue-200");
    }
  }, [search, text]);

  return (
    <Link href={`/travel?search=${encodeURIComponent(text)}`}>
      <div
        className={`text-blue-500 ${choice} hover:bg-yellow-300 rounded-32 text-16 tablet:text-14 text-center font-extrabold py-10 px-16 max-w-320 min-w-90`}
      >
        {text}
      </div>
    </Link>
  );
}

export default FilterBtn;
