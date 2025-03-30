import { useState } from "react"
import { SearchIcon } from "../../Documents/SearchIcon"

 export const CitySearch = ({mapRef}) => {
    const [city, setCity] = useState("")

    const flyToCity = async () => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${city}`)}`, {
            headers: {
              'User-Agent': 'GlobeTrek/1.0 (Gregor.johnson028@gmail.com)'
            }
        })
        const data = await response.json()
        if (data.length > 0) {
          const { lat, lon } = data[0]
          const geocode = [parseFloat(lat), parseFloat(lon)]
          const map = mapRef.current
          map.flyTo(geocode, 10)
          setCity('')
        } else {
          alert('City not found')
        }
      }
    
   return (
     <div className="w-full">
       <input type="text" className="w-9/10" value={city}
         onChange={(event) => setCity(event.target.value)} placeholder="Enter city name" onKeyUp={(event) => {
            if (event.key === 'Enter') {
                flyToCity()
            }
         }}/>
         <button  className="cursor-pointer w-1/10 bg-amber-50" onClick={flyToCity}><SearchIcon /></button>
     </div>
   )
 }
