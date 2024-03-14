import Link from "next/link";

interface Btn {
  name: string;
  link: string;
}
interface DropdownProps {
  gnbColor: string;
  buttons: Btn[];
  choiceSort?: string;
  handleBtn?: (name: string) => void;
  handleDropDown: () => void;
}

function Dropdown({
  gnbColor,
  buttons,
  choiceSort,
  handleBtn,
  handleDropDown,
}: DropdownProps) {
  return (
    <div
      className="text-16 min-w-119 min-h-96 bg-white absolute top-76 right-24 flex flex-col justify-center p-16 rounded-16 shadow z-10"
      onClick={handleDropDown}
    >
      {buttons.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`w-max h-29 flex-1 ${gnbColor === "travel" ? "hover:text-blue-400" : "hover:text-primary-press"} py-4 px-8 cursor-pointer`}
        >
          <div
            onClick={() => handleBtn?.(item.name)}
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
