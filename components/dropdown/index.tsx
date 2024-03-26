import Link from "next/link";
import { MouseEventHandler } from "react";

interface Btn {
  handleBtn: MouseEventHandler<HTMLDivElement> | undefined;
  name: string;
  link?: string;
}
interface DropdownProps {
  buttons: Btn[];
  choiceSort?: string;
  handleDropDown: () => void;
}

function Dropdown({ buttons, choiceSort, handleDropDown }: DropdownProps) {
  return (
    <div
      className="absolute right-0 top-30 z-10 flex min-h-96 min-w-119 flex-col justify-center rounded-16 bg-white p-16 text-16 shadow tablet:text-14"
      onClick={handleDropDown}
    >
      {buttons.map((item, index) =>
        item.link ? (
          <Link
            key={index}
            href={item.link}
            className={`h-29 w-max flex-1 cursor-pointer px-8 py-4 hover:text-primary-press`}
          >
            <div
              onClick={item.handleBtn}
              className={`${choiceSort === item.name && "text-primary-press"}`}
            >
              {item.name}
            </div>
          </Link>
        ) : (
          <div
            key={index}
            className={`h-29 w-max flex-1  cursor-pointer px-8 py-4 hover:text-primary-press`}
          >
            <div
              onClick={item.handleBtn}
              className={`${choiceSort === item.name && "text-primary-press"}`}
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
