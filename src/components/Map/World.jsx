import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet";
import { MarkerPopUp } from "./MarkerPopUp"
import { getPostMarker } from "../../services/postService";
import { CreateMarker } from "./CreateMarker";

export const World = ({currentUser}) => {
  const [NewPostModal, SetNewPostModal] = useState(false)
  const [userPost, SetUserPost] = useState(true)
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([])
  const [holder, setHolder] = useState([])

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.fitWorld()
    }
  }, [])

  useEffect(() => {
    getPostMarker().then(data => {
      setHolder(data)
    })
  }, [currentUser])
  useEffect(() => {
    if (userPost) {
      const userMarkers = holder.filter((marker) => marker.userId === currentUser.id)
      setMarkers(userMarkers)
    } else {
      setMarkers(holder)
    }}, [holder, currentUser, userPost])


  return (
      <div className="h-screen w-[100%] ">
            <MapContainer center={[0, 0]} z-index={10} zoom={2} style={{ height: "95%", width: "100%", position: "absolute", bottom: 0 }}
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}>
                <div className=" top-2.5 left-[37%] text-xl z-[10000] absolute">
                   <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition z-[10000]" onClick={() => SetNewPostModal(true)}>New Post</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition z-[10000]"  onClick={() => SetUserPost(true)}>user Marker</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition z-[10000]" onClick={() => SetUserPost(false)}>See all Marker</button>
                </div>
                  {NewPostModal && (
                        <CreateMarker
                          currentUser={currentUser}
                          isOpen={NewPostModal} 
                          onClose={() => setIsModalOpen(false)} 
                        />
                      )}
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
