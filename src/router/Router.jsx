import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";
import Home from "../pages/home/Home";
import CrewCreate from "../pages/Crew/CrewCreate";
import CrewHome from "../pages/CrewHome/CrewHome";


const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/signup" element={<AddInfo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crewcreate" element={<CrewCreate />} />
                <Route path="/crewHome" element={<CrewHome />} />
            </Route>
        </Routes>
    )
}

export default Router;