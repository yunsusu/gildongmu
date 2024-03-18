"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useState } from "react";

export default function GoogleMap() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState({
    lat: 37.5400456,
    lng: 126.9921017,
  });

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.GOOGLE_MAPS_API_KEY as string,
        version: "quarterly",
      });

      const google = await loader.load();

      const map = new google.maps.Map(mapRef.current as HTMLElement, {
        center: location,
        zoom: 10,
        mapId: "NEXT_MAPS_TUTS",
      });

      const marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
      });

      const infowindow = new google.maps.InfoWindow();

      marker.addListener("click", () => {
        // infowindow.setContent(name);
        infowindow.open({
          anchor: marker,
          map,
        });
      });

      // 마커를 드래그할 때 이벤트 핸들러를 추가
      marker.addListener("dragend", () => {
        const markerLocation = marker.getPosition();
        // console.log("마커의 위치:", location);
      });
    };

    initMap();
  }, []);

  return (
    <div
      id="map"
      className="h-[240px] w-[756px] bg-line-02 tablet:w-[672px] mobile:w-272"
      ref={mapRef}
      // onClick={handleMarkerClick}
    ></div>
  );
}
