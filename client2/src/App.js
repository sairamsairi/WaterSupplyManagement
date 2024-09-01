import React from "react";
import { BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import "./Home.css";
// import "./auth.css"
import Navbar from "./components/Navbar/Navbar";
// import Saved from "./pages/maps";
import Saved from "./components/maps.js";
// import Home from "./pages/Home";
import Home from "./components/HomePage/Home.jsx";
import YourConnections from "./components/YourConnections/YourConnections.jsx";
import RequestConnection from "./components/YourConnections/NewConnection/Newconnection.jsx"
import RaiseComplaint from "./components/Complaints/RaiseComplaint/RaiseComplaint.jsx"
import CheckCanId from "./components/Complaints/RaiseComplaint/checkCanId.jsx"

import Auth from "./pages/auth";
import LoginLogout from "./components/LoginLogout/LoginLogout.jsx";

import Createrecipe from "./pages/createrecipe.js";
// import Complaint from "./components/Complaints/Complaints.jsx";
import Complaint from "./components/Complaints/ComplaintList.jsx"
import Requests from "./components/Requests/Requests.jsx";
import AddWorker from "./components/Workers/Workers.jsx"

import WaterDistributionData from "./components/Reports/WaterDistributionData/WaterDistributionData.jsx";
import ConnectionsHistory from "./components/Reports/ConnectionsHistory/ConnectionsHistory.jsx";
import ComplaintsHistory from "./components/Reports/ComplaintsHistory/ComplaintsHistory.jsx"

export default function App() { 
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="createrecipe" element={<Createrecipe />} /> */}

          <Route path="complaint" element={<Complaint />} >
            <Route index element={<Outlet />} />
            <Route path="raise-complaint" element={<RaiseComplaint/>}/>
            <Route path="search-canid" element={<CheckCanId/>}/>
          </Route>

          <Route path="auth" element={<LoginLogout/>} />
          <Route path="maps" element={<Saved/>} />
          <Route path="requests" element={<Requests/>}></Route>
          <Route path="addworker" element={<AddWorker/>}></Route>

          <Route path="your-connections" element={<YourConnections/>} >
            <Route index element={<Outlet />} />
            <Route path="request-connection" element={<RequestConnection/>} />
          </Route>

          <Route path="reports" >
            <Route index element={<Outlet />} />
            <Route path="water-distribution-data" element={<WaterDistributionData/>} />
            <Route path="connections-history" element={<ConnectionsHistory/>}/>
            <Route path="complaints-history" element={<ComplaintsHistory/>}/>
          </Route> 

          <Route path="*" element={<><h1>NO such component</h1><h1>NO such component</h1><h1>NO such component</h1></>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

