import { useState } from "react";

import Comment from "@/components/detail/article/contents/comments/index";
import Destination from "@/components/detail/article/contents/destination";
import Images from "@/components/detail/article/contents/destination/descriptionImages";
import Recruitment from "@/components/detail/article/contents/recruitment";

export default function Content() {
  const [selectedId, setSelectedId] = useState("information");

  const handleClick =
    (id: string) => (event: { preventDefault: () => void }) => {
      event.preventDefault();
      setSelectedId(id);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

  const getLinkStyle = (id: string) => ({
    background: selectedId === id ? "white" : "#e0f2fe",
  });
  return (
    <div className="flex w-[956px] flex-col items-center">
      <div className="sticky top-0 z-50 flex w-full items-start gap-4 text-20 font-bold text-sky-600">
        <a
          className="flex h-60 w-1/3 justify-around rounded-tl-32 rounded-tr-32 border-none"
          href="#information"
          onClick={handleClick("information")}
          style={getLinkStyle("information")}
        >
          <span className="flex items-center">모집정보</span>
        </a>
        <a
          className="flex h-60 w-1/3 justify-around rounded-tl-32 rounded-tr-32 border-none"
          href="#destination"
          onClick={handleClick("destination")}
          style={getLinkStyle("destination")}
        >
          <span className="flex items-center">여행지</span>
        </a>
        <a
          className="flex h-60 w-1/3 justify-around rounded-tl-32 rounded-tr-32 border-none"
          href="#comment"
          onClick={handleClick("comment")}
          style={getLinkStyle("comment")}
        >
          <span className="flex items-center">댓글</span>
        </a>
      </div>
      <div className="flex w-full flex-col items-start gap-60 rounded-bl-32 rounded-br-32 bg-white px-32 pb-80 pt-32 text-20 font-bold">
        <Recruitment />
        <Images />
        <Destination />
        <Comment />
      </div>
    </div>
  );
}
