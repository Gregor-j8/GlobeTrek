import { useState } from "react"
import { Popup, Marker } from "react-leaflet"
import { customIcon } from "../../Documents/customIcon"
import { MapModal } from "./MapModal"
import { UseCurrentUser } from "../../context/CurrentUserContext"
import { PostDetailsModal } from "./PostDetailsModal"

export const MarkerPopUp = ({ marker }) => {
   const { currentUser } = UseCurrentUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [DetailsModalOpen, setDetailsModalOpen] = useState(false)
    return (  
    <>
      <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
        <Popup>
          <div className="flex flex-col">
            <button className="flex justify-center font-bold mt-1 mb-3 cursor-pointer" 
            onClick={() => {
              setDetailsModalOpen(true)}}>{marker.cityName}</button> 
            <h1 className="flex justify-center mt-1 mb-3">{marker.title}</h1>
              {marker.userId === currentUser.id ? (
                <button className="my-2 button-primary py-2 px-4 rounded-lg"
                onClick={() => setIsModalOpen(true)}>
                  Edit
                </button>
              ) : ('') }
          </div>
        </Popup>
        {DetailsModalOpen && (
              <PostDetailsModal
                isOpen={DetailsModalOpen} 
                onClose={() => setDetailsModalOpen(false)} 
                marker={marker}
                setIsModalOpen={setIsModalOpen}
              />
            )} 
        {isModalOpen && (
        <MapModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          marker={marker}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      </Marker>
    </>
  )
}
