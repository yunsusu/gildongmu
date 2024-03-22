import MyTravelHeader from "@/components/header/mytravel";
import Contents from "@/components/mytravel/Contents";
import TabMenu from "@/components/mytravel/TabMenu";

export default function MyTravel() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-[#818CF8]">
      <MyTravelHeader />
      <TabMenu />
      <Contents />
    </div>
  );
}
