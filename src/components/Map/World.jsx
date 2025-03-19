import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet";
import { MarkerPopUp } from "./MarkerPopUp"
import { getPostMarker } from "../../services/postService";

export const World = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.fitWorld();
    }
  }, []);

  useEffect(() => {
    getPostMarker().then(data => {
      setMarkers(data);
    });
  }, [markers]);

  return (
      <div className="h-screen w-[100%]">
            <MapContainer center={[0, 0]} zoom={2} style={{ height: "95%", width: "100%", position: "absolute", bottom: 0 }}
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}>
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap="true"
        />
        {markers.map(marker => {
          return <MarkerPopUp marker={marker} key={marker.id} />
        })}
      </MapContainer>
    </div>
  );
};
