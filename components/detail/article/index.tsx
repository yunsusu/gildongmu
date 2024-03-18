import Content from "@/components/detail/article/contents/index";
import Title from "@/components/detail/article/title/index";

export default function Article() {
  return (
    <div className="self flex w-full flex-col items-center gap-24 self-stretch pb-80">
      <Title />
      <Content />
    </div>
  );
}
