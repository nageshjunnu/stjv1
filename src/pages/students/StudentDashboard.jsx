import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';


const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const router = useRouter();
  const params = useParams();
  console.log(params?.slug)
  const { slug } = router.query;

  useEffect(() => {
    axios.get(`https://kyroes.in/st-josephs/api/student/byid/${localStorage.getItem("studentId")}`)
      .then(response => {
        setStudentData(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the student data!", error);
      });
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }
  const handleEditClick = () => {
    router.push('/students/edit'); // Navigate to the edit page
    localStorage.setItem("studentId",slug)
  };
  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">Profile</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#"><i className="mdi mdi-home-outline"></i></a></li>
                    <li className="breadcrumb-item" aria-current="page">Extra</li>
                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                  </ol>
                </nav>
              </div>
            </div>
            {
              JSON.parse(localStorage.getItem("usersData"))?.data.permission !== "view" && (
                <button type="button" className="btn btn-primary btn-md"  onClick={handleEditClick}>Edit</button>
              )
            }
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-7 col-xl-8">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li><a href="#usertimeline" data-bs-toggle="tab">Timeline</a></li>
                  <li><a className="active" href="#activity" data-bs-toggle="tab">Activity</a></li>
                  <li><a href="#settings" data-bs-toggle="tab">Settings</a></li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane" id="usertimeline">
                    {/* Add Timeline Content Here */}
                  </div>

                  <div className="active tab-pane" id="activity">
                    {/* Add Activity Content Here */}
                  </div>

                  <div className="tab-pane" id="settings">
                    <div className="box no-shadow">
                      <form className="form-horizontal form-element col-12">
                        <div className="form-group row">
                          <label htmlFor="inputName" className="col-sm-2 form-label">Name</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName" placeholder={studentData.name} />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputEmail" className="col-sm-2 form-label">Email</label>
                          <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail" placeholder={studentData.email} />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputPhone" className="col-sm-2 form-label">Phone</label>
                          <div className="col-sm-10">
                            <input type="tel" className="form-control" id="inputPhone" placeholder={studentData.mobile} />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputExperience" className="col-sm-2 form-label">Experience</label>
                          <div className="col-sm-10">
                            <textarea className="form-control" id="inputExperience" placeholder={studentData.work_experience}></textarea>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputSkills" className="col-sm-2 form-label">Skills</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputSkills" placeholder={studentData.roles_were} />
                          </div>
                        </div>
                        {/* <div className="form-group row">
                          <div className="ms-auto col-sm-10">
                            <div className="checkbox">
                              <input type="checkbox" id="basic_checkbox_1" defaultChecked />
                              <label htmlFor="basic_checkbox_1"> I agree to the</label>
                              &nbsp;&nbsp;&nbsp;&nbsp;<a href="#">Terms and Conditions</a>
                            </div>
                          </div>
                        </div> */}
                        <div className="form-group row">
                          <div className="ms-auto col-sm-10">
                            <button type="submit" className="btn btn-success">Edit Profile</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 col-xl-4">
              <div className="box box-widget widget-user">
                <div className="widget-user-header bg-img bbsr-0 bber-0" style={{ background: `url('../images/gallery/full/10.jpg') center center`, dataOverlay: "5" }}>
                  <h3 className="widget-user-username text-white">{studentData.name}</h3>
                  <h6 className="widget-user-desc text-white">{studentData.degree}</h6>
                  {studentData.from_year &&
                    studentData.to_year && 
                    <h6 className="widget-user-desc text-white">{studentData.from_year}-{studentData.to_year}</h6>
                  }
                </div>
                <div className="widget-user-image">
                  <img className="rounded-circle" src="../images/user3-128x128.jpg" alt="User Avatar" />
                </div>
                <div className="box-footer">
                  {/* <div className="row">
                    <div className="col-sm-4">
                      <div className="description-block">
                        <h5 className="description-header">12K</h5>
                        <span className="description-text">FOLLOWERS</span>
                      </div>
                    </div>
                    <div className="col-sm-4 be-1 bs-1">
                      <div className="description-block">
                        <h5 className="description-header">550</h5>
                        <span className="description-text">FOLLOWERS</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="description-block">
                        <h5 className="description-header">158</h5>
                        <span className="description-text">TWEETS</span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="box">
                <div className="box-body box-profile">
                  <div className="row">
                    <div className="col-12">
                      <div>
                        <p>Email :<span className="text-gray ps-10">{studentData.email}</span> </p>
                        <p>Phone :<span className="text-gray ps-10">{studentData.mobile}</span></p>
                        <p>Address :<span className="text-gray ps-10">{studentData.address}, {studentData.city}, {studentData.state}, {studentData.pincode}</span></p>
                      </div>
                    </div>
                    <div className="col-12">
                      {/* <div className="pb-15">
                        <p className="mb-10">Social Profile</p>
                        <div className="user-social-acount">
                          <button className="btn btn-circle btn-social-icon btn-facebook"><i className="fa fa-facebook"></i></button>
                          <button className="btn btn-circle btn-social-icon btn-twitter"><i className="fa fa-twitter"></i></button>
                          <button className="btn btn-circle btn-social-icon btn-instagram"><i className="fa fa-instagram"></i></button>
                        </div>
                      </div> */}
                    </div>
                    {/* <div className="col-12">
                      <div>
                        <div className="map-box">
                          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805244.1745767146!2d-86.32675167439648!3d29.383165774894163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c1766591562abf%3A0xf72e13d35bc74ed0!2sFlorida%2C+USA!5e0!3m2!1sen!2sin!4v1501665415329" width="100%" height="100" frameBorder="0" style={{ border: 0 }} allowFullScreen></iframe>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="pb-10">
                        <button type="button" className="btn btn-info">Follow</button>
                        <button type="button" className="btn btn-success">Message</button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="box">
                <div className="box-header with-border">
                  <h4 className="box-title">General Information</h4>
                </div>
                <div className="box-body no-padding">
                  <ul className="nav nav-pills flex-column">
                    <li className="nav-item"><a href="#" className="nav-link">Company <span className="badge badge-pill badge-primary float-end">{studentData.company}</span></a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Institution <span className="badge badge-pill badge-info float-end">{studentData.institution}</span></a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Industries <span className="badge badge-pill badge-danger float-end">{studentData.industries}</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
