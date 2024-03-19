import Link from "next/link";
import { MouseEventHandler } from "react";

interface Btn {
  handleBtn: MouseEventHandler<HTMLDivElement> | undefined;
  name: string;
  link?: string;
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
  // useOnClickOutside(ref, () => handleDropDown());
  return (
    <div
      // ref={ref}
      className="absolute right-24 top-76 z-10 flex min-h-96 min-w-119 flex-col justify-center rounded-16 bg-white p-16 text-16 shadow tablet:text-14"
      onClick={handleDropDown}
    >
      {buttons.map((item, index) =>
        item.link ? (
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
        ) : (
          <div
            key={index}
            className={`h-29 w-max flex-1 ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} cursor-pointer px-8 py-4`}
          >
            <div
              onClick={item.handleBtn}
              className={`${choiceSort === item.name && "text-blue-400"}`}
            >
              {item.name}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

export default Dropdown;
