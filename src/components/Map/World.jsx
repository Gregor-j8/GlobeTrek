import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet";
import { MarkerPopUp } from "./MarkerPopUp"
import { getPostMarker, getUserPostMarker } from "../../services/postService";
import { CreateMarker } from "./CreateMarker";
import { UseCurrentUser } from "../../context/CurrentUserContext";
import { GetFollowers } from "../../services/followService";

export const World = () => {
  const [NewPostModal, SetNewPostModal] = useState(false)
  const [userPost, SetUserPost] = useState(true)
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([])
  const [holder, setHolder] = useState([])
  const { currentUser } = UseCurrentUser()
  const [userValue, setUserValue] = useState(0)
  const [following, setFollowing] = useState([])

  const bounds = [
    [-90, -180], 
    [90, 180]   
  ]

  useEffect(() => {
    GetFollowers(currentUser.id).then(data => {
      setFollowing(data)
    })
  }, [currentUser])

  useEffect(() => {
    if(userValue === 0) {
          getPostMarker().then(data => {
      setHolder(data)
    })} else {
      getUserPostMarker(userValue).then(data => {
        setHolder(data)
    })}
  }, [currentUser, userValue])
  
  useEffect(() => {
    if (userPost) {
      const userMarkers = holder.filter((marker) => marker.userId === currentUser.id)
      setMarkers(userMarkers)
    } else {
      setMarkers(holder)
    }}, [ holder, currentUser, userPost])

  return (
      <div className="h-screen w-[100%]">
            <MapContainer  center={[30.505, -0.09]} zoom={3} minZoom={3} maxZoom={19} maxBounds={bounds} maxBoundsViscosity={1.0}
            style={{ height: "100vh", width: "100%", position: "absolute", bottom: 0 }}
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}>
                <div className=" top-14 left-[25%] text-xl z-[10000] absolute">
                   <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition z-[10000]" 
                   onClick={() => SetNewPostModal(true)}>New Post</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition z-[10000]" 
                     onClick={() => {
                    setUserValue(currentUser.id)
                    SetUserPost(true)
                     }}>user Marker</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition z-[10000]"
                    onClick={() => {
                      setUserValue(0)
                      SetUserPost(false)}}
                      >See all Marker</button>
                    <select onChange={(event) => {
                      SetUserPost(false)
                      setUserValue(event.target.value)}}>
                        <option value={0}>Following</option>
                        {following.map(follow => (
                            <option key={follow.user.id} value={follow.user.id}>
                                {follow.user.fullName}
                            </option>
                        ))}
                    </select>

                </div>
                  {NewPostModal && (
                        <CreateMarker
                          currentUser={currentUser}
                          isOpen={NewPostModal} 
                          onClose={() => SetNewPostModal(false)} 
                        />
                      )}
          <TileLayer
          maxZoom={22}
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
           //LightMode Url url="https://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
          //  attribution='&copy; <a href="https://maps.google.com/">Google Maps</a>'
          noWrap={true}
        />
        {markers.map(marker => {
          return <MarkerPopUp marker={marker} key={marker.id} />
        })}
      </MapContainer>
    </div>
  )
}
