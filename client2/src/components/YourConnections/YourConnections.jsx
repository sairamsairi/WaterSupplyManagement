import "./YourConnections.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";
import { IoAddCircleSharp } from "react-icons/io5";


import { Link, Outlet } from "react-router-dom";

function YourConnections(){

    const [connections, setConnections] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;

    useEffect(() => {
        const fetchConnections = async () => {
            try {
              const response = await axios.get(`http://localhost:5001/connection/searchuserconnection/${user.name}`);
              // console.log('Response from server:', response.data);
            setConnections(response.data);

            } catch (error) {
                console.error('Error fetching connections:', error);
            }
        };
        fetchConnections();
    }, [connections]);



    return (
        <div className="connection-container">
          <h1>Your connections</h1>

          {connections.data ?<Link to="/your-connections/request-connection">
          <button className="request" disabled title="Connections already exist" style={{cursor:"not-allowed"}}>Request Connection <IoAddCircleSharp className="icon"/>
            </button>
          </Link> : <Link to="/your-connections/request-connection">
          <button className="request">Request Connection            <IoAddCircleSharp className="icon"/>
            </button>
          </Link>}
          <div>
        {/* Use Outlet here to render child routes */}
        <Outlet />
          </div>
            {/* <p>{JSON.stringify(connections)}</p> */}
          <div>
            {connections.data ? (
              (
                <div className="connection">
                  <h3><strong>CAN Number: {connections.data.can}</strong></h3>
                  <span><strong>Name: </strong>{connections.data.name}</span>
                  <span><strong>Address: </strong>{connections.data.address}</span>
                  <span><strong>City: </strong>{connections.data.city}</span>
                  <span><strong>Pincode: </strong>{connections.data.pincode}</span>

                </div>
              )
            ) : (
              <h3>You do not currently have an active water connection</h3>
            )}
          </div>
        </div>
      );
}

export default YourConnections;