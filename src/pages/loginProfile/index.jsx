import React, { useState } from 'react';
import axios from 'axios';
import md5 from 'md5'; // Make sure to install md5 package: npm install md5

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChangePassword = () => {
    setError(null);
    setSuccessMessage(null);

    // Check if current password matches the stored password (for demonstration using localStorage)
    const storedPassword = localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')).data.password : '';
    const hashedCurrentPassword = md5(currentPassword);

    if (hashedCurrentPassword !== md5(storedPassword)) {
        console.log(hashedCurrentPassword)
        console.log(storedPassword)
      setError('Current password is incorrect.');
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    // Example API request to change password
    const data = {
      student_id: JSON.parse(localStorage.getItem('usersData')).data.student_id,
      new_password: newPassword,
    };

    axios.post('https://kyroes.in/st-josephs/api/student-password/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setSuccessMessage('Password changed successfully!');
      // Additional logic can be added here based on the API response
    })
    .catch(error => {
      setError('Failed to change password. Please try again.');
      console.error('Error:', error);
    });
  };

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <h3 className="page-title">Change Password</h3>
        </div>
        <section className="content">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Change Password</button>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
              {successMessage && <p className="text-success mt-3">{successMessage}</p>}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
