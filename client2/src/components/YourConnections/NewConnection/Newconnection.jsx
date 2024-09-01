// import React, { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import {jwtDecode} from "jwt-decode";
// import { useCookies } from "react-cookie";
// import './NewWaterConnection.css';

// const NewWaterConnection = () => {

//     const [connections, setConnections] = useState([]);
//     const [cookies, setCookies] = useCookies(["access_token"]);
//     const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;

//     const [showModal, setShowModal] = useState(true);
//     const [formData, setFormData] = useState({
//         name: user.name,
//         address: '',
//         city: '',
//         pincode: '',
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try{
//             console.log(formData);
//             const response = await axios.post("http://localhost:5001/connection/addconnection", formData)

//             setShowModal(false)
//             alert("Request for new connection successfully sent")
//             // window.location.reload();
//             Navigate('/your-connections')
//         } catch(error){
//             console.error("Error submitting form:", error);
//             // alert("An unexpected error occurred");
//         }
//     }

//     return (
//         <div>
//             {/* <button onClick={() => setShowModal(true)}>Request New Water Connection</button> */}
//             {showModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={() => setShowModal(false)}><Link to="/your-connections" className='close-icon'>&times;</Link></span>
//                         <h2 className="form-title">New Water Connection Request</h2>
//                         <form className="connection-form" onSubmit={handleSubmit}>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Your Username"
//                                 value={formData.name}
//                                 readOnly={true}
//                                 disabled={true}
//                                 onChange={handleChange}
//                                 className="input-field"
//                             />
//                             <input
//                                 type="address"
//                                 name="address"
//                                 placeholder="Address"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 className="input-field"
//                             />
//                             <input
//                                 type="text"
//                                 name="city"
//                                 placeholder="City"
//                                 value={formData.city}
//                                 onChange={handleChange}
//                                 className="input-field"
//                             />
//                             <input
//                                 type="number"
//                                 name="pincode"
//                                 placeholder="Pincode"
//                                 value={formData.pincode}
//                                 onChange={handleChange}
//                                 className="input-field"
//                             />
//                             <button type="submit" className="submit-button">Submit Request</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default NewWaterConnection;









// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-providers';
// import './NewWaterConnection.css';

// const NewWaterConnection = () => {
//   const [cookies] = useCookies(['access_token']);
//   const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;

//   const [formData, setFormData] = useState({
//     name: user.name,
//     address: '',
//     city: '',
//     pincode: '',
//     latitude: null,
//     longitude: null,
//   });

//   const navigate = useNavigate();

//   const MAX_ACCURACY = 5;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleMapClick = (e) => {
//     const { lat, lng } = e.latlng;
//     setFormData({ ...formData, latitude: lat, longitude: lng });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       console.log(formData);
//       // Assuming you have the correct API endpoint
//       const response = await axios.post('http://localhost:5001/connection/addconnection', formData);

//       alert('Request for a new connection successfully sent');
//       // Use navigate instead of history.push
//       navigate('/your-connections');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   // Separate useEffect for the map to update when coordinates change
//   useEffect(() => {
//     // You can add any additional logic needed for the map here
//     console.log('Map center updated:', formData.latitude, formData.longitude);
//   }, [formData.latitude, formData.longitude]);

//   useEffect(() => {
//     const getLocation = async () => {
//       if ('geolocation' in navigator) {
//         try {
//           let position = null;
//           while (position === null || position.coords.accuracy > MAX_ACCURACY) {
//             position = await new Promise((resolve, reject) => {
//               navigator.geolocation.getCurrentPosition(resolve, reject);
//             });
//             const { latitude, longitude, accuracy } = position.coords;
//             setFormData({ ...formData, latitude, longitude, accuracy });
//             console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}`);
//           }
//           console.log('Location with desired accuracy reached:', position);
//         } catch (error) {
//           console.error('Error getting location:', error);
//         }
//       } else {
//         console.error('Geolocation is not supported in your browser');
//       }
//     };
  
//     getLocation();
//   }, []); // Run only once on component mount
  

//   return (
//     <div className="new-connection-container">
//       <div className="form-container">
//         <h2 className="form-title">New Water Connection Request</h2>
//         <form className="connection-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={formData.city}
//             onChange={handleChange}
//             className="input-field"
//           />
//           <input
//             type="number"
//             name="pincode"
//             placeholder="Pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             className="input-field"
//           />
//           <button type="submit" className="submit-button">
//             Submit Request
//           </button>
//         </form>
//       </div>
//       <div className="map-container">
//       <div className="map-container">
//         {formData.latitude !== null && formData.longitude !== null && (
//           <MapContainer
//             center={[formData.latitude, formData.longitude]}
//             zoom={13}
//             style={{ height: '300px', width: '100%' }}
//             onClick={handleMapClick}
//           >
//             {/* Use OpenStreetMap.Mapnik as the base layer using leaflet-providers */}
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <Marker position={[formData.latitude, formData.longitude]}>
//               <Popup>Your selected location</Popup>
//             </Marker>
//           </MapContainer>
//         )}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default NewWaterConnection;





















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-providers';
import './NewWaterConnection.css';

const markerIcon = new L.Icon({
    iconUrl: require("./blue.png"),
    iconSize: [35, 45],
    iconAnchor: [6,45],
    popupAnchor:[0,-46]
})

const NewWaterConnection = () => {
  const [cookies] = useCookies(['access_token']);
  const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const [formData, setFormData] = useState({
    name: user.name,
    address: '',
    city: '',
    pincode: '',
    latitude: null,
    longitude: null,
  });

  const navigate = useNavigate();

  const MAX_ACCURACY = 5;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setFormData({ ...formData, latitude: lat, longitude: lng });
  };

  const handleShapeCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'marker') {
      const { lat, lng } = layer.getLatLng();
      setFormData({...formData, latitude:lat, longitude:lng})
      console.log(`Marker created at Latitude: ${lat}, Longitude: ${lng}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5001/connection/addconnection', formData);

      alert('Request for a new connection successfully sent');
      navigate('/your-connections');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    console.log('Map center updated:', formData.latitude, formData.longitude);
  }, [formData.latitude, formData.longitude]);

  useEffect(() => {
    const getLocation = async () => {
      if ('geolocation' in navigator) {
        try {
          let position = null;
          while (position === null || position.coords.accuracy > MAX_ACCURACY) {
            position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude, accuracy } = position.coords;
            setFormData({ ...formData, latitude, longitude, accuracy });
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}`);
          }
          console.log('Location with desired accuracy reached:', position);
        } catch (error) {
          console.error('Error getting location:', error);
        }
      } else {
        console.error('Geolocation is not supported in your browser');
      }
    };
  
    getLocation();
  }, []);
  

  return (
    <div className="new-connection-container">
      <div className="form-container">
        <h2 className="form-title">New Water Connection Request</h2>
        <form className="connection-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="input-field"
          />

            <div className='map-section'>
            <div className='map-container-withCheckbox'>
                <div className="map-container">
                    {formData.latitude !== null && formData.longitude !== null && (
                    <MapContainer
                        center={[formData.latitude, formData.longitude]}
                        zoom={13}
                        style={{ height: '400px', width: '600px' }}
                        onClick={handleMapClick}
                    >
                        <FeatureGroup>
                        <EditControl
                            position='topright'
                            onCreated={handleShapeCreated}
                            draw={{
                            rectangle: false,
                            polygon: false,
                            polyline: false,
                            circlemarker: false,
                            circle: false
                            }}
                        />
                        </FeatureGroup>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[formData.latitude, formData.longitude]} icon={markerIcon}>
                        <Popup>Your Live Location</Popup>
                        </Marker>
                    </MapContainer>
                    )}
                </div>
                <div className='checkbox'>
                    <label className='checkbox-label'>
                            {/* Checkbox input */}
                            <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            />
                            <strong className="checkbox-text">I cannot provide an address or specify a location</strong>
                    </label>
                </div>
            </div>
            <div className='map-rules'>
                <h2>Rules for Locating Point:</h2>
                <ol>
                    <li>Ensure that you provide a <strong>valid address.</strong></li>
                    <li>If the map is not loaded properly, please <strong>reload the page.</strong></li>
                    <li>If the point is not accurately placed on the map, please <strong>reload the page.</strong></li>
                    <li>If no specific location is indicated on the map, your <strong>live location will be considered.</strong></li>
                    <li>If you cannot provide an address or specify a location, <strong>check the designated checkbox.</strong></li>
                </ol>
            </div>
            </div>

          <button type="submit" className="submit-button">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewWaterConnection;
