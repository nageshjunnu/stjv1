import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserCreateForm = () => {
  const router = useRouter();

  // State to manage form data
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    status: '',
    permission: '',
    role_type: '',
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to create a new user
      const response = await axios.post('https://kyroes.in/st-josephs/api/users/user/', user);
      if (response.data.status === 'success') {
        console.log('User created successfully:', response.data);
        alert('User created successfully');
        router.push('/users'); // Redirect to users list page or wherever needed
      } else {
        console.error('Failed to create user:', response.data.message);
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  // Function to handle cancellation
  const handleCancel = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">Create User</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#"><i className="mdi mdi-home-outline"></i></a></li>
                    <li className="breadcrumb-item" aria-current="page">User Management</li>
                    <li className="breadcrumb-item active" aria-current="page">Create User</li>
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
                      {/* Input fields for user details */}
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
                              required
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
                              required
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
                              required
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
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
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
                              <option value="view">View</option>
                              <option value="edit">Edit</option>
                              <option value="full_access">Full Access</option>
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
                              <option value="admin">Admin</option>
                              <option value="principal">Principal</option>
                              <option value="convenor">Convenor</option>
                              <option value="teacher">Teacher</option>
                              <option value="coordinator">Coordinator</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-actions mt-10">
                      <button type="submit" className="btn btn-primary"><i className="fa fa-check"></i> Save</button>
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

export default UserCreateForm;
