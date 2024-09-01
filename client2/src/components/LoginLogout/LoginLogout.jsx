import React, { useState } from 'react';
import './LoginLogout.css';
import LogIn from '../Login/Login'
import SignIn from '../Signup/Signup'
import { Link } from 'react-router-dom';

function LoginLogout() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <div className="login-logout-container">
      {showLogin ? (
        <>
          <div className="left-panel">
            <img
              src="https://www.xylem.com/en-in/making-waves/water-utilities-news/how-one-utility-uses-a-digital-twin-to-manage-real-time-drinking-water-distribution/contentassets/1200x400-digital-twin-drinking-water-network.jpg?width=300&height=100&quality=65&rmode=crop&bgcolor=ffffffff&format=webp"
              alt=""
            />
          </div>
          <div className="right-panel">
            <div className='inner-panel'>
                {<LogIn/>}
                <span>Don't have an Account? </span>
                <Link onClick={toggleForm}>Sign Up</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="left-panel">
            <div className='inner-pannel'>
                {<SignIn/>}
                <span>Already registered? </span>
                <Link onClick={toggleForm}>Log In</Link>
            </div>
          </div>
          <div className="right-panel">
            <img
              src="https://www.xylem.com/en-in/making-waves/water-utilities-news/how-one-utility-uses-a-digital-twin-to-manage-real-time-drinking-water-distribution/contentassets/1200x400-digital-twin-drinking-water-network.jpg?width=300&height=100&quality=65&rmode=crop&bgcolor=ffffffff&format=webp"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LoginLogout;
