import CommuChat from "@/components/community/commuchat";

function CommuList() {
  return (
    <div
      style={{ height: "calc(100% - 120px)" }}
      className="m-auto h-full w-full max-w-[1200px] px-40 pb-40 tablet:px-20 tablet:pb-20"
    >
      <div className="border-Dimensions-05 h-full w-full overflow-scroll rounded-32 border-2 bg-white pt-40 tablet:pt-20">
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
        <CommuChat />
      </div>
    </div>
  );
}
export default CommuList;
