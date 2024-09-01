import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './complaint.css';
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";
import { IoIosAlert } from "react-icons/io";
import { Link, Outlet } from 'react-router-dom';
import {getuserID} from '../../hooks/getuserID';
import { useNavigate } from 'react-router-dom';

const ComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;
    const navigate = useNavigate;
    const userId = getuserID();
    // alert(JSON.stringify(user))
    if(userId==null){
        navigate('/auth');
    }
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                if(user && (user.role=="admin" || user.role=="engineer")){
                const response = await axios.get('http://localhost:5001/complaints/getcomplaints');
                const allComplaints= response.data;
                const unresolvedComplaints=allComplaints.filter(
                    (complaint)=>complaint.resolved=='no'
                );
                setComplaints(unresolvedComplaints);
            }
            else if(user && (user.role=="citizen")){
                const response = await axios.post('http://localhost:5001/complaints/usercomplaint',{
                    "name":user.name
                });
                setComplaints(response.data);
                // alert(JSON.stringify(response.data))
            }
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, []);
    const handleYesClick = async (complaintId) => {
        // alert(complaintId);
        complaintId = complaintId.toString();
        console.log(complaintId);
        try {
          const res = await axios.post(`http://localhost:5001/complaints/handlecomplaint`, {
            _id: complaintId, // Send the complaintId directly, not as an object
          });
          console.log(res);
          if (res) {
            console.log(res);
            const updatedComplaints = complaints.filter(
              (complaint) => complaint._id.toString() !== complaintId.toString()
            );
            setComplaints(updatedComplaints);
            console.log("updated");
          } else {
            console.log("no");
          }
        } catch (error) {
          console.error(`Error updating complaint status:`, error);
        }
      };
      
        
      const handleNoClick = async (complaintId) => {
        console.log(`No action taken for complaint ID ${complaintId}`);
    };

    // const handleClick = () =>{
    //     navigate("search-canid");
    // }

    if( user && (user.role=="admin" || user.role=="engineer")){
        return (
            <div className="complaints-container">
                {/* {alert(user.role)} */}
                <h1>Complaints Received</h1>
                <div>
                    {Array.isArray(complaints) && complaints.map((complaint, index) => (
                        <div className="complaint" key={index}>
                            <span><strong>Complaint ID: </strong>{complaint._id}</span>
                            <span style={{textTransform:"capitalize"}}><strong>User: </strong>{complaint.name}</span>
                            <span><strong>CAN ID: </strong>{complaint.canId}</span>
                            <span><strong>Email: </strong>{complaint.email}</span>
                            <span><strong>Mobile Number: </strong>{complaint.mobile}</span>
                            <span><strong>Subject: </strong>{complaint.subject}</span>
                            <span><strong>Description: </strong>{complaint.description}</span>
                            <span><strong>Problem is resolved?</strong></span>
                            <div className="buttons">
                                <button onClick={()=>handleYesClick(complaint._id)}>Yes</button>
                                <button onClick={()=>handleNoClick(complaint._id)}>No</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    else if(user && (user.role=="citizen")){
        return (
            <div className="complaints-container">
                <h1>Complaints Received</h1>
                <Link to="search-canid">
                <button className="request" >Raise Complaint            <IoIosAlert className="icon"/>
                    </button>
                </Link>
                <div>
                <div>
                    {/* Use Outlet here to render child routes */}
                    <Outlet />
                </div>
                    {Array.isArray(complaints) && complaints.length>0 ? (
                    
                    complaints.map((complaint, index) => (
                        <div className="complaint" key={index}>
                            <span><strong>Complaint ID: </strong>{complaint._id}</span>
                            <span><strong>User: </strong>{complaint.name}</span>
                            <span><strong>CAN ID: </strong>{complaint.canId}</span>
                            <span><strong>Email: </strong>{complaint.email}</span>
                            <span><strong>Mobile Number: </strong>{complaint.mobile}</span>
                            <span><strong>Subject: </strong>{complaint.subject}</span>
                            <span><strong>Description: </strong>{complaint.description}</span>
                            <span><strong>Resolved: </strong>{complaint.resolved}</span>
                        </div>
                    ))):

                    (<h3>No complaints received so far</h3>)
                }
                </div>
            </div>
        );
    }
    else{
        // return(
        //     <h1>PAGE NOT FOUND!!</h1>
        // )
        // alert("ju")
        navigate("/auth", {replace: true})
        // var button = document.getElementById("login-btnid");
        // alert(button)
        // button.click();
    }
    
};

export default ComplaintsPage;