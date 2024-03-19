"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

interface GoogleMapProps {
  location: google.maps.LatLng | null | google.maps.LatLngLiteral;
  pageType: string;
}

export default function GoogleMap({ pageType, location }: GoogleMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  let style = "";

  switch (pageType) {
    case "write":
      style =
        "h-[240px] w-[756px] bg-line-02 tablet:w-[672px] mobile:w-272 rounded-12";
      break;
    case "detail":
      style =
        "h-[500px] w-[892px] tablet:w-[672px] tablet:h-376 mobile:w-272 mobile:h-[152.5px] rounded-12";
      break;
    default:
      break;
  }

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: apiKey as string,
        version: "quarterly",
      });

      const google = await loader.load();

      const map = new google.maps.Map(mapRef.current as HTMLElement, {
        center: location,
        zoom: 10,
        mapId: "NEXT_MAPS_TUTS",
      });

      new google.maps.Marker({
        position: location,
        map: map,
        draggable: false,
      });
    };

    initMap();
  }, [location, apiKey]);

  return <div id="map" className={style} ref={mapRef} />;
}
