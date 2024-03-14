import Domestic from "@/components/main/contents/domestic";
import Foreign from "@/components/main/contents/foreign";
import Travel from "@/components/main/contents/travel";

export default function Contents() {
  return (
    <div className="min-h-screen">
      <Travel />
      <Domestic />
      <Foreign />
    </div>
  );
}
