interface TitleProps {
  title: string;
  type: string;
}

export default function Title({ title, type }: TitleProps) {
  return (
    <>
      {type === "front" && (
        <div className="text-16 font-bold leading-5 tracking-tighter text-white tablet:text-14">
          {title}
        </div>
      )}
      {type === "back" && (
        <div className="mb-24 text-16 font-bold leading-5 tracking-tighter tablet:mb-16 tablet:text-14 mobile:mb-10">
          {title}
        </div>
      )}
    </>
  );
}
