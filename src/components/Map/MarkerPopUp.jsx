import { Popup, Marker } from "react-leaflet";
import { customIcon } from "../../Documents/customIcon";

export const MarkerPopUp = ({ marker }) => {
  return (  
    <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
      <Popup>
        <div>
          <h3>{marker.popup}</h3>
          <button onClick={() => deleteMarker(marker.id)}>
            🗑 Delete
          </button>
        </div>
      </Popup>
    </Marker>
  )}
