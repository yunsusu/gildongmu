import Content from "@/components/detail/article/contents/index";
import Title from "@/components/detail/article/title/index";

export default function Article() {
  return (
    <div className="self mx-auto flex w-full max-w-[956px] flex-col items-center gap-24 self-stretch pb-80 tablet:max-w-[720px] mobile:max-w-[312px]">
      <Title />
      <Content />
    </div>
  );
}
