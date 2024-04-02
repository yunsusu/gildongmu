import Content from "@/components/detail/article/contents/index";
import Title from "@/components/detail/article/title/index";
import { DetailDataType } from "@/lib/api/detail/type";

export default function Article({ data }: DetailDataType) {
  return (
    <div className="self mx-auto flex w-full max-w-[1200px] flex-col items-center gap-24 self-stretch px-24 pb-80 mobile:min-w-[312px]">
      <Title data={data} id={data?.id} />
      <Content data={data} id={data?.id} />
    </div>
  );
}
