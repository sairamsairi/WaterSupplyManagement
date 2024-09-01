import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";
import './RaiseComplaint.css';

const RaiseComplaint = (props) => {

    const [connections, setConnections] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;
    // const {canId} = props.location.state;
    const location = useLocation();
    const canId = location.state?.message;
    console.log(canId);

    useEffect(() => {
        alert(JSON.stringify(props))
        console.log(props);
        const fetchConnections = async () => {
            try {
            const response = await axios.post('http://localhost:5001/connection/searchuserconnection', {
                name:user.name
            });
            setConnections(response.data);
            // alert(connections)
            } catch (error) {
                console.error('Error fetching connections:', error);
            }
        };
        fetchConnections();
    }, []);


    const [showModal, setShowModal] = useState(true);
    const [formData, setFormData] = useState({
        name: user.name,
        canId: canId,
        email: '',
        mobile:'',
        subject:'',
        description:'',
    });
    const [CanId, setCanId] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
        console.log(formData);
    
        try {
            
            const response = await axios.post('http://localhost:5001/complaints/postcomplaint', formData);
    
           
            console.log(response.data);
    
           
            setShowModal(false);
    
           
    
        } catch (error) {
            
            console.error("Error submitting form:", error);
    
            
            if (error.response && error.response.status === 400) {
                alert("Can Id not found");
            } else {
                
                alert("An error occurred while submitting the complaint. Please try again.");
            }
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
                        <form className="connection-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Username"
                                value={formData.name}
                                readOnly={true}
                                disabled={true}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="canId"
                                placeholder="Your CanID"
                                value={canId}
                                readOnly={true}
                                disabled={true}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <input
                                type="number"
                                name="mobile"
                                placeholder="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="input-field"
                            />

                            <input 
                            type="text"
                            name='subject'
                            placeholder='subject'
                            value={formData.subject}
                            onChange={handleChange}
                            className='input-field'
                             />

                            <input 
                            type="text"
                            name='description'
                            placeholder='description'
                            value={formData.description}
                            onChange={handleChange}
                            className='input-field'
                             />

                            <button type="submit" onClick={handleSubmit} className="submit-button">Submit Request</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RaiseComplaint;