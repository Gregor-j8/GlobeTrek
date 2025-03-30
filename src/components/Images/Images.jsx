import { useState } from "react"

export const Images = ({photoUrl, setPhotoUrl}) => {
    const [preview, setPreview] = useState('')

    const handleImageChange = async(event) => {
        const file = event.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
            const formData = new FormData()
            formData.append("image", file)
                const response = await fetch("https://api.imgbb.com/1/upload?key=8a6f8c2705b4dd2a1fc090f8185220e2", {
                    method: "POST",
                    body: formData,
                })
                const data = await response.json()
                setPhotoUrl(data.data.url)
                if (!photoUrl === '') {
                    setPreview('')  
                }}}
    
    return (
        <div className="flex flex-col items-center p-6 border rounded-2xl shadow-lg bg-gray-400 max-w-sm mx-auto mt-5">
            <h2 className="text-lg font-semibold mb-4">Upload an Image</h2>
            <input type="file"
             onChange={handleImageChange} className="border p-2 rounded-md w-full mb-"/>
            {preview && (<img src={preview} alt="Preview" className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md mb-2" />)}
        </div>
    )
}