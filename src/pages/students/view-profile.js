import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProfilePage = () => {
  const [studentData, setStudentData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://kyroes.in/st-josephs/api/student/byid/${localStorage.getItem("studentId")}`);
        setStudentData(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the student data!", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleEditClick = () => {
    router.push('/students/edit');
    localStorage.setItem("studentId", studentData.student_id);
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <section className="content">
          <div className="tab-pane fade show active" id="per_details_tab" role="tabpanel">
            <div className="row">
              <div className="col-lg-9">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between">
                      <span>Personal Details</span>
                      <a className="edit-link"   onClick={handleEditClick} style={{cursor:"pointer"}}>
                        Edit
                      </a>
                    </h5>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Name</p>
                      <p className="col-sm-9">{studentData.name}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Gender</p>
                      <p className="col-sm-9">{studentData.gender}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Date of Birth</p>
                      <p className="col-sm-9">{studentData.dob}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Batch Start</p>
                      <p className="col-sm-9">{studentData.batchstart}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Batch End</p>
                      <p className="col-sm-9">{studentData.batchend}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Degree</p>
                      <p className="col-sm-9">{studentData.degree}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Program</p>
                      <p className="col-sm-9">{studentData.program}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Primary Key</p>
                      <p className="col-sm-9">{studentData.pkey}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Address</p>
                      <p className="col-sm-9 mb-0">
                        {studentData.address},<br/>
                        {studentData.city},<br/>
                        {studentData.district},<br/>
                        {studentData.state} - {studentData.pincode},<br/>
                        {studentData.country}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between">
                      <span>Contact Details</span>
                      <a className="edit-link"  onClick={handleEditClick} style={{cursor:"pointer"}}> Edit</a>
                    </h5>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">Mobile</p>
                      <p className="col-sm-6">{studentData.mobile}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">Alternate Mobile</p>
                      <p className="col-sm-6">{studentData.alternate_mobile}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">Email</p>
                      <p className="col-sm-6">{studentData.email}</p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between">
                      <span>Education Details</span>
                      <a className="edit-link"  onClick={handleEditClick} style={{cursor:"pointer"}}> Edit</a>
                    </h5>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">Roll Number</p>
                      <p className="col-sm-6">{studentData.roll_number}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">From Year</p>
                      <p className="col-sm-6">{studentData.from_year}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">To Year</p>
                      <p className="col-sm-6">{studentData.to_year}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">Institution</p>
                      <p className="col-sm-6">{studentData.institution}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">Company</p>
                      <p className="col-sm-6">{studentData.company}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-6 text-muted text-sm-end mb-0 mb-sm-3">Work Experience</p>
                      <p className="col-sm-6">{studentData.work_experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="password_tab" className="tab-pane fade" role="tabpanel">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Change Password</h5>
                <div className="row">
                  <div className="col-md-10 col-lg-6">
                    <form>
                      <div className="form-group">
                        <label>Old Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <button className="btn btn-primary" type="submit">Save Changes</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
