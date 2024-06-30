import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    axios.get(`https://kyroes.in/st-josephs/api/users/user/${slug}`)
      .then(response => {
        if (response.data.status === 'success') {
          setUser(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, [slug]);

  if (!user) return null;
  const handleEditClick = () => {
    router.push('/users/edit'); // Navigate to the edit page
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">User Profile - {user.name}</h5>
              {/* <button type="button" className="btn-close" aria-label="Close" onClick={()=>{router.back()}}></button> */}
              <button type="button" className="btn btn-secondary" onClick={handleEditClick}>Edit</button>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img src={`../images/avatar/${user.id}.jpg`} alt="User Avatar" className="img-fluid rounded-circle mb-3" style={{ maxWidth: '150px' }} />
                </div>
                <div className="col-md-8">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Address:</strong> {user.address}, {user.city}, {user.state} - {user.zipcode}</p>
                  <p><strong>Status:</strong> {user.status}</p>
                  <p><strong>Role Type:</strong> {user.role_type}</p>
                  <p><strong>Last Updated:</strong> {user.updated_at}</p>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="button" className="btn btn-secondary" onClick={()=>{router.push("/users")}}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
