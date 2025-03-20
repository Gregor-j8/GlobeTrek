import { useState } from "react"
import { Popup, Marker } from "react-leaflet"
import { customIcon } from "../../Documents/customIcon"
import { MapModal } from "./MapModal"

export const MarkerPopUp = ({ marker }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (  
    <>
      <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
        <Popup>
          <div>
            <h3>{marker.popup}</h3>
            <button onClick={() => setIsModalOpen(true)}>
              Edit
            </button>
          </div>
        </Popup>
        {isModalOpen && (
        <MapModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          marker={marker}
        />
      )}
      </Marker>
      
    </>
  )
}
