import { Outlet, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/navbar/Navbar"
import { Home } from "../components/Home/Home"

export const AuthorizedViews = () => {
    return <>
        <Routes>
        <Route path="/" element={
                <>
                    <Navbar />
                    <Outlet />
                </>}>
                <Route path="home" element={<Home />}/>
            </Route>
        </Routes>
    </> 
}