import { Outlet, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/navbar/Navbar"

export const AuthorizedViews = () => {
    return <>
        <Routes>
        <Route path="/" element={
                <>
                    <Navbar />
                    <Outlet />
                </>}>
            </Route>
        </Routes>
    </> 
}