import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Adjust as needed
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]); // Fetch users when currentPage changes

  const fetchUsers = () => {
    const offset = (currentPage - 1) * itemsPerPage;
    axios.get(`https://kyroes.in/st-josephs/api/users/user/?offset=${offset}&limit=${itemsPerPage}`)
      .then(response => {
        if (response.data.status === 'success') {
          setUsers(response.data.data);
          setTotalUsers(response.data.total); // Assuming your API provides total count
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleRowClick = (userId) => {
    router.push(`/users/${userId}`);
    localStorage.setItem("userId", userId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">User list</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#"><i className="mdi mdi-home-outline"></i></a></li>
                    <li className="breadcrumb-item" aria-current="page">Contact</li>
                    <li className="breadcrumb-item active" aria-current="page">User list</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-lg-9 col-md-8">
              <div className="box">
                <div className="media-list media-list-divided media-list-hover">
                  {users.map(user => (
                    <div key={user.id} className="media align-items-center" onClick={() => handleRowClick(user.id)}>
                      <span className={`badge badge-dot badge-${user.status === 'active' ? 'success' : 'danger'}`}></span>
                      <a className="avatar avatar-lg" href="#">
                        <img src={`../images/avatar/${user.id}.jpg`} alt="..." />
                      </a>
                      <div className="media-body">
                        <p>
                          <a href="#"><strong>{user.name}</strong></a>
                          <small className="sidetitle">{user.status === 'active' ? 'Online' : `Last seen: ${user.updated_at}`}</small>
                        </p>
                        <p>{user.role_type}</p>
                        <nav className="nav mt-2">
                          <a className="nav-link" href="#"><i className="fa fa-facebook"></i></a>
                          <a className="nav-link" href="#"><i className="fa fa-twitter"></i></a>
                          <a className="nav-link" href="#"><i className="fa fa-github"></i></a>
                          <a className="nav-link" href="#"><i className="fa fa-linkedin"></i></a>
                        </nav>
                      </div>
                      <div className="media-right gap-items">
                        <a className="media-action lead" href="#" data-bs-toggle="tooltip" title="Orders"><i className="ti-shopping-cart"></i></a>
                        <a className="media-action lead" href="#" data-bs-toggle="tooltip" title="Receipts"><i className="ti-receipt"></i></a>
                        <div className="btn-group">
                          <a className="media-action lead" href="#" data-bs-toggle="dropdown"><i className="ion-android-more-vertical"></i></a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                            <a className="dropdown-item" href="#"><i className="fa fa-fw fa-comments"></i> Messages</a>
                            <a className="dropdown-item" href="#"><i className="fa fa-fw fa-phone"></i> Call</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#"><i className="fa fa-fw fa-remove"></i> Remove</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({ length: Math.ceil(totalUsers / itemsPerPage) }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
          
        </section>
      </div>
    </div>
  );
};

export default UserList;
