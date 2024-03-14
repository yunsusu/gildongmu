import Searchbar from "@/components/header/searchbar";

interface HeaderProps {
  headerColor: string;
  children: string;
}

export default function Header({ headerColor, children }: HeaderProps) {
  return (
    <div
      className={`flex flex-col items-center self-stretch justify-center w-full gap-10 px-24 py-40 h-240 tablet:h-200 ${headerColor}`}
    >
      <div className="flex max-w-[1200px] tablet:max-w-[768px] mobile:max-w-360 flex-col items-center gap-24">
        <span className="font-extrabold leading-9 tracking-tight text-center text-white text-32 tablet:text-24">
          {children}
        </span>
        <Searchbar />
      </div>
    </div>
  );
}
