import Searchbar from "@/components/header/searchbar";

interface HeaderProps {
  headerColor: string;
  children: any;
}

export default function Header({ headerColor, children }: HeaderProps) {
  return (
    <div
      className={`h-240 flex w-full flex-col items-center justify-center gap-10 self-stretch px-24 py-40 tablet:h-200 ${headerColor}`}
    >
      <div className="mobile:max-w-360 flex max-w-[1200px] flex-col items-center gap-24 tablet:max-w-[768px]">
        <span className="text-center text-32 font-black leading-9 tracking-tight text-white tablet:text-24">
          {children}
        </span>
        <Searchbar />
      </div>
    </div>
  );
}
