// import { Link } from "react-router-dom";
// import React, { useEffect } from 'react';

// const widthStyle = {
//   width: '10%',
// };

const Saved = () => {
  // const handleButtonClick = () => {
  //   console.log("Navigating to point.html");
  //   // alert("Navigating to maps");
  //   window.location.href = '../New Water Supply Project/index.html';
  // };


  
  // useEffect(() => {
  //   handleButtonClick();
  // }, []); 

  return (
    <>
    <div style={{ marginTop: '100px', padding: '10px 20px',  }} >
    <iframe
        src="../Map/index2.html"
        // src="../Map/index2.html"
        width="100%"
        height="700px"  
        tabIndex="0"
      />
    </div>
    </>
  );
}

export default Saved;




// const Saved = () => {
//   return (
//     <div style={{ marginTop: '100px', padding: '10px 20px' }}>
//       <iframe
//         src="./Map/index2.html"
//         width="100%"
//         height="700px"
//         title="Local HTML"
//         tabIndex="0"
//       />
//     </div>
//   );
// };

// export default Saved;
