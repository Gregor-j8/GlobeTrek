import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet";
import { MarkerPopUp } from "./MarkerPopUp"
import { getPostMarker, getUserPostMarker } from "../../services/postService"
import { CreateMarker } from "./CreateMarker";
import { UseCurrentUser } from "../../context/CurrentUserContext";
import { GetFollowering } from "../../services/followService";
import { GetUserById } from "../../services/userService";
import { CitySearch } from "./CitySearch";

export const World = () => {
  const [NewPostModal, SetNewPostModal] = useState(false)
  const [userPost, SetUserPost] = useState(true)
  const mapRef = useRef(null)
  const [markers, setMarkers] = useState([])
  const [holder, setHolder] = useState([])
  const { currentUser } = UseCurrentUser()
  const [userValue, setUserValue] = useState(0)
  const [Holdfollowing, setHoldFollowing] = useState([])
  const [following, setFollowing] = useState([])
  const [isOpen, setIsOpen] = useState(false) 

  const bounds = [
    [-90, -180], 
    [90, 180]   
  ]

  useEffect(() => {
    GetFollowering(currentUser.id).then(data => {
      setHoldFollowing(data)
    })
  }, [currentUser])

      useEffect(() => {
          const getUser = async () => {
                  const userPromises = Holdfollowing.map(id =>
                      GetUserById(id.follow.userId).then())
                  const userData = await Promise.all(userPromises)
                  setFollowing(userData.flat())
              } 
              getUser()
      }, [Holdfollowing])

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
            style={{ height: "100vh", width: "100%", position: "absolute", bottom: 0 }} ref={mapRef}>
                <div className="flex text-xl z-[10000] w-1/8 absolute top-18 left-1">
                  <div className="relative flex items-center w-full justify-start">
                      <button className="flex justify-center items-start text-sm
                      font-medium text-gray-700 bg-white rounded-md" 
                      onClick={() => {setIsOpen(!isOpen)}}>
                        <span className="mr-2 text-lg">Filter</span>
                      </button>
                      {isOpen && <div className="absolute top-full left-0 mt-1 rounded-md shadow-lg bg-white p-1">
                        <div>
                          <CitySearch mapRef={mapRef} />
                        </div>
                          <button className="bg-blue-500 w-full text-white px-4 py-2 rounded shadow-md hover:bg-blue-700" 
                          onClick={() => SetNewPostModal(true)}>New Post</button>
                          <button className="bg-blue-500 text-white w-full px-4 py-2 rounded shadow-md hover:bg-blue-700" 
                          onClick={() => {
                          setUserValue(currentUser.id)
                          SetUserPost(true)
                          }}>user Marker</button>
                          <button className="bg-blue-500 text-white w-full px-4 py-2 rounded shadow-md hover:bg-blue-700"
                          onClick={() => {
                            setUserValue(0)
                            SetUserPost(false)}}
                            >See all Marker</button>
                          <select onChange={(event) => {
                            SetUserPost(false)
                            setUserValue(event.target.value)}}>
                              <option value={0}>Following</option>
                              {following.map(follow => (
                                  <option key={follow.id} value={follow.id}>
                                      {follow.fullName}
                                  </option>
                              ))}
                          </select>
                      </div>
                      } 
                  </div>
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
          noWrap={true}
        />
        {markers.map(marker => {
          return <MarkerPopUp marker={marker} key={marker.id} />
        })}
      </MapContainer>
    </div>
  )
}
