import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CrewCreate from "../pages/CrewCreate/CrewCreate";
import CrewHome from "../pages/CrewHome/CrewHome";
import CrewMain from "../pages/CrewMain/CrewMain";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";
import Activities from "../pages/activities/Activities";
import Details from "../pages/activities/components/Details";
import Community from "../pages/community/Community";
import Home from "../pages/home/Home";
import CrewSchedule from "../pages/CrewSchedule/CrewSchedule";


const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/signup" element={<AddInfo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crewcreate" element={<CrewCreate />} />
                <Route path="/crew" element={<CrewMain />}>
                    <Route path="crewHome" element={<CrewHome />} />
                    <Route path="crewActivity" element={<Activities />} />
                    <Route path="crewActivity/:index" element={<Details />} />
                    <Route path="crewCommunity" element={<Community />} />
                </Route>
                <Route path="/crew/crewSchedule" element={<CrewSchedule />} />
            </Route>
        </Routes>
    )
}

export default Router;