import { useEffect, useState } from "react";

export default function DetailSort({
  recruitInView,
  destinationInView,
  commentInView,
}: any) {
  const [selectedId, setSelectedId] = useState("information");

  useEffect(() => {
    if (recruitInView) {
      setSelectedId("information");
    } else if (destinationInView) {
      setSelectedId("destination");
    } else if (commentInView) {
      setSelectedId("comment");
    }
  }, [recruitInView, destinationInView, commentInView]);

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
    <div className="sticky top-0 z-10 flex w-full items-start gap-4 bg-sky-50 text-20 font-bold text-sky-600">
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
  );
}
