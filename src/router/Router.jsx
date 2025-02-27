import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Activities from "../pages/activities/Activities";
import Details from "../pages/activities/components/Details";
import Community from "../pages/community/Community";
import UpdateCommunity from "../pages/community/components/updateCommunity";
import WriteCommunity from "../pages/community/components/WriteCommunity";
import CrewCreate from "../pages/CrewCreate/CrewCreate";
import CrewHome from "../pages/CrewHome/CrewHome";
import CrewList from "../pages/CrewList/CrewList";
import CrewMain from "../pages/CrewMain/CrewMain";
import AddNotice from "../pages/CrewNotice/Components/AddNotice";
import UpdateNotice from "../pages/CrewNotice/Components/UpdateNotice";
import CrewNotice from "../pages/CrewNotice/CrewNotice";
import { NoticeProvider } from "../pages/CrewNotice/NoticeProvider";
import CrewSchedule from "../pages/CrewSchedule/CrewSchedule";
import Setting from "../pages/CrewSetting/CrewSetting";
import Home from "../pages/home/Home";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/signup" element={<AddInfo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crewcreate" element={<CrewCreate />} />
                <Route path="/crews/:crewId" element={<CrewMain />}>
                    <Route path="crewHome" element={<CrewHome />} />
                    <Route path="crewNotice" element={<NoticeProvider><CrewNotice /></NoticeProvider>} />
                    <Route path="addNotice" element={<NoticeProvider><AddNotice /></NoticeProvider>} />
                    <Route path="updateNotice/:noticeId" element={<UpdateNotice />} />
                    <Route path="crewActivity" element={<Activities />} />
                    <Route path="crewActivity/:index" element={<Details />} />
                    <Route path="crewCommunity" element={<Community />} />
                    <Route path="crewCommunity/write" element={<WriteCommunity />} />
                    <Route path="crewCommunity/update/:feedId" element={<UpdateCommunity />} />
                    <Route path="crewSetting" element={<Setting />} />
                </Route>
                <Route path="/crews/:crewId/crewSchedule" element={<CrewSchedule />} />
                <Route path="/crewList" element={<CrewList />} />
            </Route>
        </Routes>

    )
}

export default Router;