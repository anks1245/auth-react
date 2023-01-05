import { Route,Router,Routes } from "react-router-dom";
import App from "./App";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";

const AppRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            {/* <Route path="/logout" element={}/> */}
        </Routes>
    );
}

export default AppRoutes;