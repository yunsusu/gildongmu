import { useInView } from "react-intersection-observer";

import Comment from "@/components/detail/article/contents/comments/index";
import Destination from "@/components/detail/article/contents/destination";
import Images from "@/components/detail/article/contents/destination/descriptionImages";
import Recruitment from "@/components/detail/article/contents/recruitment";
import Sort from "@/components/detail/article/contents/sort";
import { DetailDataType } from "@/lib/api/detail/type";

export default function Content({ data }: DetailDataType) {
  const [recruitRef, recruitInView] = useInView();
  const [destinationRef, destinationInView] = useInView();
  const [commentRef, commentInView] = useInView();
  return (
    <div className="flex w-full flex-col items-center">
      <Sort
        recruitInView={recruitInView}
        destinationInView={destinationInView}
        commentInView={commentInView}
      />
      <div className="flex w-full flex-col items-start gap-60 rounded-bl-32 rounded-br-32 bg-white px-32 pb-80 pt-32 text-20 font-bold tablet:gap-40 tablet:px-24 tablet:pb-60 tablet:pt-24 mobile:px-20 mobile:pb-32 mobile:pt-24">
        <Recruitment
          id={data?.id}
          data={data}
          recruitRef={recruitRef}
          secret={undefined}
          content={undefined}
        />
        <Images
          id={data?.id}
          data={data}
          secret={undefined}
          content={undefined}
        />
        <Destination
          id={data?.id}
          data={data}
          destinationRef={destinationRef}
          secret={undefined}
          content={undefined}
        />
        <Comment
          id={data?.id}
          data={data}
          commentRef={commentRef}
          secret={undefined}
          content={undefined}
        />
      </div>
    </div>
  );
}
