import Content from "@/components/Detail/Article/Contents/index";
import Title from "@/components/Detail/Article/Title/index";
import { DetailDataType } from "@/lib/api/detail/type";

export default function Article({ data }: DetailDataType) {
  return (
    <div className="self mx-auto flex w-full max-w-[1200px] flex-col items-center gap-24 self-stretch px-24 pb-80 mobile:min-w-[312px]">
      <Title
        data={data}
        id={data?.id}
        secret={data?.secret}
        content={data?.content}
      />
      <Content
        data={data}
        id={data?.id}
        secret={data?.secret}
        content={data?.content}
      />
    </div>
  );
}
