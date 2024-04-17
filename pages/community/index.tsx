import CommuList from "@/components/Community/Commulist";
import CommuHeader from "@/components/Community/Header";

function Community() {
  return (
    <div style={{ height: "calc(100vh - 60px)" }} className="h-full bg-bg-05">
      <CommuHeader />
      <CommuList />
    </div>
  );
}

export default Community;
