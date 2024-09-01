// import axios from 'axios'
// const ConnectionsDetails = ({connections}) =>{
//     const deleteConnection = async () => {
//         // console.log("Button is clicked, and the complaint is:", complaint);
    
//         try {
//             const response = await axios.delete(`http://localhost:5001/connection/acceptconnection/${connections._id}`)
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             // console.log(Complaint with id: ${complaint._id} is successfully deleted);
//         } catch (error) {
//             console.log("Error while trying to delete");
//             console.error('Error:', error);
//         }
//     };

//     return(
//         <div className="connection">
//             <h3><strong>CAN Number: {connections.can}</strong></h3>
//             <span><strong>Name: </strong>{connections.name}</span>
//             <span><strong>Address: </strong>{connections.address}</span>
//             <span><strong>City: </strong>{connections.city}</span>
//             <span><strong>Pincode: </strong>{connections.pincode}</span>
//             <button onClick={deleteConnection}>Accept Connection</button>
//         </div>
//     )
// }
// export default ConnectionsDetails




import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Requests.css';

const ConnectionsDetails = ({ connections }) => {
  const navigate = useNavigate();

  const deleteConnection = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/connection/acceptconnection/${connections._id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle success or redirect to map section
      console.log(`Connection with id ${connections._id} accepted successfully`);
      redirectToMapSection();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const redirectToMapSection = (latitude, longitude, can) => {
    navigate(`/maps?source=addPoint&latitude=${latitude}&longitude=${longitude}&can=${can}`); 
  };

  return (
    <div className="connection">
        <h3><strong>CAN Number: {connections.can}</strong></h3>
        <span><strong>Name: </strong>{connections.name}</span>
        <span><strong>Address: </strong>{connections.address}</span>
        <span><strong>City: </strong>{connections.city}</span>
        <span><strong>Pincode: </strong>{connections.pincode}</span>
        <span><strong>Coordinates: </strong>Lattitude: {connections.latitude} &nbsp; &nbsp; Longitude: {connections.longitude}</span>
        <button onClick={deleteConnection}>Accept Connection</button>
        <button onClick={() => redirectToMapSection(connections.latitude, connections.longitude, connections.can)}>Add Point on Map</button>
    </div>
  );
};

export default ConnectionsDetails;