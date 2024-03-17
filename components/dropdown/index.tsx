import Link from "next/link";
import { MouseEventHandler, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface Btn {
  handleBtn: MouseEventHandler<HTMLDivElement> | undefined;
  name: string;
  link: string;
}
interface DropdownProps {
  gnbColor?: string;
  buttons: Btn[];
  choiceSort?: string;
  handleDropDown: () => void;
}

function Dropdown({
  gnbColor,
  buttons,
  choiceSort,
  handleDropDown,
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 시 handleDropDown 함수 호출
  useOnClickOutside(ref, () => handleDropDown());
  return (
    <div
      ref={ref}
      className="absolute right-24 top-76 z-10 flex min-h-96 min-w-119 flex-col justify-center rounded-16 bg-white p-16 text-16 shadow tablet:text-14"
      onClick={handleDropDown}
    >
      {buttons.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`h-29 w-max flex-1 ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} cursor-pointer px-8 py-4`}
        >
          <div
            onClick={item.handleBtn}
            className={`${choiceSort === item.name && "text-blue-400"}`}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Dropdown;
