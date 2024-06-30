import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ResetPassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { token } = router.query; // Get the token from URL params

  useEffect(() => {
    const resetPassword = async () => {
      if (!token) return;

      const data = JSON.stringify({
        token,
        password: '' // Sending an empty password as per the requirement
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://kyroes.in/st-josephs/api/send-reset-password/',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data
      };

      try {
        const response = await axios.request(config);
        setSuccess('Password reset successfully');
        setError('');
      } catch (error) {
        setError('Failed to reset password');
        setSuccess('');
      }
    };

    resetPassword();
  }, [token]);

  const handleLoginRedirect = () => {
    router.push('/');
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button onClick={handleLoginRedirect} className="btn btn-primary">Login</button>
    </div>
  );
};

export default ResetPassword;
