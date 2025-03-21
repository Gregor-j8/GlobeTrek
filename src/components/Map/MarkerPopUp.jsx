import { useState } from "react"
import { Popup, Marker } from "react-leaflet"
import { customIcon } from "../../Documents/customIcon"
import { MapModal } from "./MapModal"

export const MarkerPopUp = ({ marker }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  console.log(marker)

  return (  
    <>
      <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
        <Popup>
          <div className="flex flex-col">
            <h2 className="flex justify-center font-bold mt-1 mb-3">{marker.cityName}</h2>  
            <h1 className="flex justify-center font-bold mt-1 mb-3">{marker.title}</h1>
                <button 
                className="my-2 button-primary py-2 px-4 rounded-lg"
                onClick={() => setIsModalOpen(true)}>
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
