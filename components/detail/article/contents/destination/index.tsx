import Image from "next/image";
import { useEffect, useState } from "react";
import { geocode, RequestType, setKey } from "react-geocode";

import { Location } from "@/components/form/writeForm";
import GoogleMap from "@/components/googlemap";
import { DestinationProps } from "@/lib/api/detail/type";

export default function Destination({
  data,
  destinationRef,
}: DestinationProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [location, setLocation] = useState<Location>({
    lat: 37.5400456,
    lng: 126.9921017,
  });
  const destination = data?.destination;

  useEffect(() => {
    const trimmedDestination = destination ? destination.trim() : "";

    if (trimmedDestination !== "") {
      setKey(String(apiKey));
      geocode(RequestType.ADDRESS, destination)
        .then(({ results }) => {
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            setLocation({
              lat: lat,
              lng: lng,
            });
          }
        })
        .catch(console.error);
    }
  }, [destination, apiKey]);

  return (
    <>
      <div className="relative flex w-full flex-col items-start gap-32 self-stretch tablet:gap-24">
        <span className="text-20 tablet:text-18">여행지</span>
        <div className="flex flex-col items-start gap-16 self-stretch">
          <div className="flex items-center gap-12">
            <div className="relative h-24 w-24 tablet:h-20 tablet:w-20">
              <Image
                src="/icons/location_red.svg"
                alt="장소 표시 이미지"
                fill
              />
            </div>
            <span className="text-16 font-bold leading-[20.8px] tablet:text-14">
              {destination}
            </span>
          </div>
          <div className="tablet:h-376 h-[500px] w-[892px] rounded-12 tablet:h-[376px] tablet:w-[672px] mobile:h-[152.5px] mobile:w-272">
            <GoogleMap location={location} />
          </div>
        </div>
        <div
          ref={destinationRef}
          className="absolute top-[620px] h-1 w-full"
        ></div>
      </div>
      <div id="comment" className="-translate-y-25"></div>
    </>
  );
}
