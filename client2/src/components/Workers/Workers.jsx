import React, { useState } from 'react';
import './Workers.css';

const AddWorker = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }

    console.log(formData);
  };

  return (
    <div className='whole'>
      <div className="work_btn">
      <button className='worker_btn' onClick={() => setShowModal(true)}>Add Worker</button></div>
      {showModal && (
          <div className="worker worker_drop">
            <div className="worker-content">
              
              {/* <h2 className="form-title">Add Worker</h2> */}
              <form className="worker-form" onSubmit={handleSubmit}>
                <div className="work_inp">
                <input
                  type="text"
                  name="name"
                  // placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
                <label htmlFor="">Name</label>
                </div>
                <div className="work_inp">
                <input
                  type="text"
                  name="phoneNumber"
                  // placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="input-field"
                />
                <label htmlFor="">Phone number</label>
                </div>
                <div className="work_inp">
                <input
                  type="email"
                  name="email"
                  // placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
                <label htmlFor="">Email</label>
                </div>
                <div className="work_inp">
                <input
                  type="password"
                  name="password"
                  // placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                />
                <label htmlFor="">Password</label>
                </div>
                <div className="work_inp">
                <input
                  type="password"
                  name="confirmPassword"
                  // placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                />
                <label htmlFor="">Confirm password</label>
                </div>
                <div className="work_btn1">
                <button type="submit" className="submit_work-button">
                  Add
                </button>
                </div>
              </form>
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
            </div>
          </div>
      )}
    </div>
  );
};

export default AddWorker;