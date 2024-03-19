import Image from "next/image";

export default function Destination() {
  return (
    <div
      id="destination"
      className="flex w-full flex-col items-start gap-32 self-stretch pt-60"
    >
      <span>여행지</span>
      <div className="flex flex-col items-start gap-16 self-stretch">
        <div className="flex items-center gap-12">
          <div className="relative h-24 w-24">
            <Image src="/icons/location_red.svg" alt="장소 표시 이미지" fill />
          </div>
          <span className="text-16 font-bold leading-[20.8px]">
            {"영국, 런던"}
          </span>
        </div>
        <div className="relative h-[500px] w-[892px]">
          <Image
            className="rounded-16"
            src="https://i.namu.wiki/i/EchoVcoRKArNn17MtwKZP5ZS2aJdhC5_S5mpoowWd3mdsvM-L0IC-nsITZqO1aW4a2g8FhP0QE7WBI41WEserhGZurYc5PPRt1Nl07mB40rxoUXO66P95Op0p8i0i4QIxQ4y50YbfRudX1k47GW75g.webp"
            alt="여행 지도 이미지"
            fill
          />
        </div>
      </div>
    </div>
  );
}
