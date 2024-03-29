import Image from "next/image";
import { useState } from "react";

import { deleteBookMarks, postBookMarks } from "@/lib/api/bookmarks";

interface BookmarkProp {
  data: any;
}

export default function Bookmark({ data }: BookmarkProp) {
  const [bookmark, setIsBookmark] = useState(true);

  return (
    <>
      {data.bookmark || bookmark ? (
        <div
          className="h-24 w-24 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            postBookMarks(data.id);
            setIsBookmark(prev => !prev);
          }}
        >
          <Image
            src={"/icons/heartOn.svg"}
            alt="하트 아이콘"
            width={24}
            height={24}
          />
        </div>
      ) : (
        <div
          className="h-24 w-24 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            deleteBookMarks(data.id);
            setIsBookmark(prev => !prev);
          }}
        >
          <Image
            src={"/icons/heartOff.svg"}
            alt="빈하트 아이콘"
            width={24}
            height={24}
          />
        </div>
      )}
    </>
  );
}
