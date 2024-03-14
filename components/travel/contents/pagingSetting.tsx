import Image from "next/image";

function PagingSetting() {
  return (
    <div className="w-full flex justify-between mb-32">
      <div className="flex gap-8">
        <div className="w-24 h-24 relative cursor-pointer">
          <Image src={"/icons/layout-grid.svg"} alt="그리드버전" fill />
        </div>
        <div className="w-24 h-24 relative cursor-pointer">
          <Image src={"/icons/list.svg"} alt="리스트버전" fill />
        </div>
      </div>
      <div>sdf</div>
    </div>
  );
}

export default PagingSetting;
