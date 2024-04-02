import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import { deleteBookMarks, postBookMarks } from "@/lib/api/bookmarks";

interface BookmarkProp {
  data: any;
}

export default function Bookmark({ data }: BookmarkProp) {
  const [isBookmark, setIsBookmark] = useState(data.myBookmark);
  const postid = data.id;

  const queryClient = useQueryClient();

  const addBookmark = useMutation({
    mutationFn: postBookMarks,
    onSuccess: () => {
      setIsBookmark(true);
      queryClient.invalidateQueries();
    },
  });

  const removeBookmark = useMutation({
    mutationFn: deleteBookMarks,
    onSuccess: () => {
      setIsBookmark(false);
      queryClient.invalidateQueries();
    },
  });

  const handleBookmarkToggle = () => {
    if (data.myBookmark) {
      removeBookmark.mutate(postid);
    } else {
      addBookmark.mutate(postid);
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
        src={data.myBookmark ? "/icons/heartOn.svg" : "/icons/heartOff.svg"}
        alt={data.myBookmark ? "하트 아이콘" : "빈하트 아이콘"}
        width={24}
        height={24}
      />
    </div>
  );
}
