import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";
import Home from "../pages/home/Home";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/signup" element={<AddInfo />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    )
}

export default Router;