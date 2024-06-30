import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put('https://kyroes.in/st-josephs/api/reset/', {
        email: email
      });
      // Assuming API returns a success message or status
      setResetStatus(response.data.message); // Adjust according to API response structure
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetStatus('Failed to reset password.'); // Handle error state
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="container h-p100">
      <div className="row align-items-center justify-content-md-center h-p100">
        <div className="col-12">
          <div className="row justify-content-center g-0">
            <div className="col-lg-5 col-md-5 col-12">
              <div className="bg-white rounded10 shadow-lg">
                <div className="content-top-agile p-20 pb-0">
                  <h3 className="mb-0 text-primary">Recover Password</h3>
                </div>
                <div className="p-40">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-transparent"><i className="ti-email"></i></span>
                        <input
                          type="email"
                          className="form-control ps-15 bg-transparent"
                          placeholder="Your Email"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <button type="submit" className="btn btn-info margin-top-10">Reset</button>
                      </div>
                    </div>
                  </form>
                  {resetStatus && (
                    <div className="mt-3">
                      <p>{resetStatus}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
