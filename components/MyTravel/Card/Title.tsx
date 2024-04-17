interface TitleProps {
  title: string;
  type: string;
  isMobile?: boolean;
}

export default function Title({ title, type, isMobile }: TitleProps) {
  return (
    <>
      {type === "front" && (
        <span
          className={`line-clamp-1 w-[222px] overflow-hidden text-16 font-bold leading-5 tracking-tighter text-white tablet:w-187 tablet:text-14 ${isMobile ? "mobile:w-full" : "mobile:w-219"}`}
        >
          {title}
        </span>
      )}
      {type === "back" && (
        <span className="line-clamp-1 overflow-hidden text-16 font-bold leading-5 tracking-tighter tablet:mb-16 tablet:text-14 mobile:mb-10">
          {title}
        </span>
      )}
    </>
  );
}
