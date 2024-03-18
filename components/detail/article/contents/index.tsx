import Comment from "@/components/detail/article/contents/comments/index";
import Destination from "@/components/detail/article/contents/destination";
import Images from "@/components/detail/article/contents/destination/descriptionImages";
import Recruitment from "@/components/detail/article/contents/recruitment";
import Sort from "@/components/detail/article/contents/sort";

export default function Content() {
  return (
    <div className="flex w-[956px] flex-col items-center">
      <Sort />
      <div className="flex w-full flex-col items-start gap-60 rounded-bl-32 rounded-br-32 bg-white px-32 pb-80 pt-32 text-20 font-bold">
        <Recruitment />
        <Images />
        <Destination />
        <Comment />
      </div>
    </div>
  );
}
