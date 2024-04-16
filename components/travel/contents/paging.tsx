import CardGrid from "@/components/Travel/Contents/cardGrid";
import PagingSetting from "@/components/Travel/Contents/pagingSetting";

function Paging() {
  return (
    <div className="relative border-b border-line-03 bg-white font-bold tracking-tight text-text-01">
      <div className="relative m-auto w-full max-w-[1200px] px-24 pb-80 pt-40 tablet:pb-40 tablet:pt-24 mobile:pb-24">
        <PagingSetting />

        <CardGrid />
      </div>
    </div>
  );
}

export default Paging;
