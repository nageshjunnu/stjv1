import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserEditForm = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    created_at: '',
    updated_at: '',
    status: '',
    permission: '',
    role_type: '',
  });

  const statusOptions = ['active', 'in-active'];
  const permissionOptions = ['view', 'edit', 'full access'];
  const roleTypeOptions = ['admin', 'principal', 'convenor', 'teacher', 'coordinator'];

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId")
      try {
        const response = await axios.get(`https://kyroes.in/st-josephs/api/users/user/${userId}`);
        if (response.data.status === 'success') {
          setUser(response.data.data); // Assuming response.data.data directly contains user data
        } else {
          console.error('Failed to fetch user data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://kyroes.in/st-josephs/api/users/user/${user.id}`, user);
      if (response.data.status === 'success') {
        console.log('User updated successfully:', response.data);
        alert('User updated successfully');
      } else {
        console.error('Failed to update user:', response.data.message);
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error updating user data');
    }
  };

  const handleCancel = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">Edit User</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#"><i className="mdi mdi-home-outline"></i></a></li>
                    <li className="breadcrumb-item" aria-current="page">User Management</li>
                    <li className="breadcrumb-item active" aria-current="page">Edit User</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-header with-border">
                  <h4 className="box-title">User Details</h4>
                </div>
                <div className="box-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={user.name}
                              onChange={handleInputChange}
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={user.email}
                              onChange={handleInputChange}
                              placeholder="Email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              value={user.password}
                              onChange={handleInputChange}
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              value={user.phone}
                              onChange={handleInputChange}
                              placeholder="Phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={user.address}
                              onChange={handleInputChange}
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              value={user.city}
                              onChange={handleInputChange}
                              placeholder="City"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">State</label>
                            <input
                              type="text"
                              className="form-control"
                              name="state"
                              value={user.state}
                              onChange={handleInputChange}
                              placeholder="State"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Zipcode</label>
                            <input
                              type="text"
                              className="form-control"
                              name="zipcode"
                              value={user.zipcode}
                              onChange={handleInputChange}
                              placeholder="Zipcode"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Status</label>
                            <select
                              className="form-control"
                              name="status"
                              value={user.status}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Status</option>
                              {statusOptions.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Permission</label>
                            <select
                              className="form-control"
                              name="permission"
                              value={user.permission}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Permission</option>
                              {permissionOptions.map((permission, index) => (
                                <option key={index} value={permission}>{permission}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Role Type</label>
                            <select
                              className="form-control"
                              name="role_type"
                              value={user.role_type}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Role Type</option>
                              {roleTypeOptions.map((role, index) => (
                                <option key={index} value={role}>{role}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Created At</label>
                            <input
                              type="text"
                              className="form-control"
                              name="created_at"
                              value={user.created_at}
                              readOnly
                              placeholder="Created At"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Updated At</label>
                            <input
                              type="text"
                              className="form-control"
                              name="updated_at"
                              value={user.updated_at}
                              readOnly
                              placeholder="Updated At"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="
form-actions mt-10">
                      <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}> <i className="fa fa-check"></i> Save</button>
                      <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserEditForm;
