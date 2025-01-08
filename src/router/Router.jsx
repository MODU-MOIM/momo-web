import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CrewCreate from "../pages/CrewCreate/CrewCreate";
import CrewHome from "../pages/CrewHome/CrewHome";
import CrewMain from "../pages/CrewMain/CrewMain";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";
import Activities from "../pages/activities/Activities";
import Details from "../pages/activities/components/Details";
import Home from "../pages/home/Home";


const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/signup" element={<AddInfo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Activities" element={<Activities />} />
                <Route path="/Activities/:index" element={<Details />} />
                <Route path="/crewcreate" element={<CrewCreate />} />
                <Route path="/crew" element={<CrewMain />}>
                    <Route path="crewHome" element={<CrewHome />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default Router;