"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

interface GoogleMapProps {
  location: google.maps.LatLng | null | google.maps.LatLngLiteral;
}

export default function GoogleMap({ location }: GoogleMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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

  return <div id="map" className="h-full w-full rounded-2xl" ref={mapRef} />;
}
