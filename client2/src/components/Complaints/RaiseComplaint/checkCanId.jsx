import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";
import './RaiseComplaint.css';

const CheckCanId = () => {
    
    const navigate = useNavigate();
    const [connections, setConnections] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;



    const [showModal, setShowModal] = useState(true);
    const [formData, setFormData] = useState({
        name: user.name,
        address: '',
        city: '',
        pincode: '',
    });
    const [canId, setCanId] = useState(null)

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        setCanId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            console.log(formData);
            const response = await axios.get(`http://localhost:5001/complaints/search-canid/${canId}`)

            setShowModal(false)
            alert("User found"+JSON.stringify(response))
            // window.location.reload();
            navigate('/complaint/raise-complaint', { state: { message: canId } });

        } catch(error){
            console.error("Error submitting form:", error);
            alert("Can Id not found");
        }
    }

    return (
        <div>
            {/* <button onClick={() => setShowModal(true)}>Request New Water Connection</button> */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}><Link to="/complaint" className='close-icon'>&times;</Link></span>
                        {/* {alert(JSON.stringify(connections))} */}
                        <h2 className="form-title">Raise Complaint</h2>
                        <form className="connection-form" onSubmit={handleSubmit}>
                            <input
                                type="number"
                                name="pincode"
                                placeholder="CanId"
                                value={canId}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <button type="submit" className="submit-button">Check CAN</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckCanId;