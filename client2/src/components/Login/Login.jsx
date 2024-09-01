import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Login.css';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const notify = () => toast('Login successful', { position: 'top-center' });
  const spotify = () => toast('Invalid credentials. Please try again.', { position: 'top-center' });

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/auth/login', {
        username,
        password,
      });

      console.log('Response:', response);

      if (response.data && response.data.token) {
        console.log('Login successful');
        notify();
        setTimeout(() => {
          setCookies('access_token', response.data.token);
          window.localStorage.setItem('userID', response.data.userID);
          window.localStorage.setItem('role', response.data.role);
          navigate('/');
        }, 2000);
      } else {
        console.log('Invalid credentials');
        spotify();
      }
    } catch (err) {
      console.error(err);
      console.log('An error occurred while logging in');
      toast('An error occurred while logging in. Please try again later.', { position: 'top-center' });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="login-form">
        <h2 className='heading'>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='username'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id='login-form'>
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LogIn;