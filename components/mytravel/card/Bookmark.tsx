import Image from "next/image";
import { useState } from "react";

import { deleteBookMarks, postBookMarks } from "@/lib/api/bookmarks";

interface BookmarkProp {
  data: any;
}

export default function Bookmark({ data }: BookmarkProp) {
  const [isBookmark, setIsBookmark] = useState(true);

  const handleBookmarkToggle = () => {
    if (data.myBookmark) {
      deleteBookMarks(data.id);
      setIsBookmark(false);
    } else {
      postBookMarks(data.id);
      setIsBookmark(true);
    }
  };

  return (
    <div
      className="h-24 w-24 cursor-pointer"
      onClick={e => {
        e.stopPropagation();
        handleBookmarkToggle();
      }}
    >
      <Image
        src={
          data.myBookmark && isBookmark
            ? "/icons/heartOn.svg"
            : "/icons/heartOff.svg"
        }
        alt={data.myBookmark && isBookmark ? "하트 아이콘" : "빈하트 아이콘"}
        width={24}
        height={24}
      />
    </div>
  );
}
