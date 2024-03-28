import CommuList from "@/components/community/commuList";
import CommuHeader from "@/components/community/header";

function Community() {
  return (
    <div style={{ height: "calc(100vh - 60px)" }} className="h-full bg-bg-05">
      <CommuHeader />
      <CommuList />
    </div>
  );
}

export default Community;
