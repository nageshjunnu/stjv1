import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewStudentForm = () => {
  const [student, setStudent] = useState({
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    dob: '',
    batchstart: '',
    batchend: '',
    degree: '',
    program: '',
    roll_number: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    mobile: '',
    alternate_mobile: '',
    company: '',
    work_experience: '',
    from_year: '',
    to_year: '',
    roles_were: '',
    industries: '',
    contribution: [],
    photo: '',
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    let updatedContribution = [...student.contribution];
    if (e.target.checked) {
      updatedContribution.push(value);
    } else {
      updatedContribution = updatedContribution.filter(item => item !== value);
    }
    setStudent({ ...student, contribution: updatedContribution });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // axios.defaults.timeout = 10000; // 10 seconds
    try {
      await axios.post('https://kyroes.in/st-josephs/api/register/', student);
      alert('Student registered successfully');
      router.push('/success'); // Redirect to success page
    } catch (error) {
      console.error('Error registering student:', error);
      alert('Error registering student');
    }
  };

  const handleCancel = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <h3 className="page-title">New Student Form</h3>
        </div>
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-body">
                  <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div className="form-body">
                      {/* Email Address */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Email Address *</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={student.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* First Name and Last Name */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">First Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="first_name"
                              value={student.first_name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Last Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="last_name"
                              value={student.last_name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Gender and Date of Birth */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Gender</label>
                            <div>
                              <label style={{marginRight:"1em"}}>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="Male"
                                  checked={student.gender === 'Male'}
                                  onChange={handleInputChange}
                                />{' '}
                                Male
                              </label>
                              <label className="ml-3">
                                <input
                                  type="radio"
                                  name="gender"
                                  value="Female"
                                  checked={student.gender === 'Female'}
                                  onChange={handleInputChange}
                                />{' '}
                                Female
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Date of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              name="dob"
                              value={student.dob}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Batch Start and End Year */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Batch Start Year *</label>
                            <select
                              className="form-control"
                              name="batchstart"
                              value={student.batchstart}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select Start Year</option>
                              {/* Generate options from 1997 to 2030 */}
                              {Array.from({ length: 34 }, (_, i) => 1997 + i).map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Batch End Year *</label>
                            <select
                              className="form-control"
                              name="batchend"
                              value={student.batchend}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select End Year</option>
                              {/* Generate options from 1997 to 2030 */}
                              {Array.from({ length: 34 }, (_, i) => 1997 + i).map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Degree and Program */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Degree</label>
                            <input
                              type="text"
                              className="form-control"
                              name="degree"
                              value={student.degree}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Program</label>
                            <input
                              type="text"
                              className="form-control"
                              name="program"
                              value={student.program}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Roll Number */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Roll Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="roll_number"
                              value={student.roll_number}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address, City, District */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={student.address}
                              onChange={handleInputChange}
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
                              value={student.city}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">District</label>
                            <input
                              type="text"
                              className="form-control"
                              name="district"
                              value={student.district}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* State and Pincode */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">State</label>
                            <input
                              type="text"
                              className="form-control"
                              name="state"
                              value={student.state}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Pincode</label>
                            <input
                              type="text"
                              className="form-control"
                              name="pincode"
                              value={student.pincode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Mobile and Alternate Mobile */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Mobile Number *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="mobile"
                              value={student.mobile}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Alternate Mobile Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="alternate_mobile"
                              value={student.alternate_mobile}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Current Work Details */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Company/Organization</label>
                            <input
                              type="text"
                              className="form-control"
                              name="company"
                              value={student.company}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Total Work Experience (years)</label>
                            <input
                              type="text"
                              className="form-control"
                              name="work_experience"
                              value={student.work_experience}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">From Year</label>
                            <input
                              type="text"
                              className="form-control"
                              name="from_year"
                              value={student.from_year}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">To Year</label>
                            <input
                              type="text"
                              className="form-control"
                              name="to_year"
                              value={student.to_year}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Roles you were in and Industries you worked in */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Roles you were in</label>
                            <input
                              type="text"
                              className="form-control"
                              name="roles_were"
                              value={student.roles_were}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Industries you worked in</label>
                            <input
                              type="text"
                              className="form-control"
                              name="industries"
                              value={student.industries}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contribution to the Institution */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Contribution to the Institution</label>
                            <div>
                              <label style={{marginRight:"1em"}}>
                                <input
                                  type="checkbox"
                                  name="contribution"
                                  value="Resource Provider"
                                  checked={student.contribution.includes('Resource Provider')}
                                  onChange={handleCheckboxChange}
                                />{' '}
                                Resource Provider
                              </label>
                              <label className="ml-3" style={{marginRight:"1em"}}>
                                <input
                                  type="checkbox"
                                  name="contribution"
                                  value="Job Provider"
                                  checked={student.contribution.includes('Job Provider')}
                                  onChange={handleCheckboxChange}
                                />{' '}
                                Job Provider
                              </label>
                              <label className="ml-3" style={{marginRight:"1em"}}>
                                <input
                                  type="checkbox"
                                  name="contribution"
                                  value="Placement Advisor"
                                  checked={student.contribution.includes('Placement Advisor')}
                                  onChange={handleCheckboxChange}
                                />{' '}
                                Placement Advisor
                              </label>
                              <label className="ml-3" style={{marginRight:"1em"}}>
                                <input
                                  type="checkbox"
                                  name="contribution"
                                  value="Academic Advisor"
                                  checked={student.contribution.includes('Academic Advisor')}
                                  onChange={handleCheckboxChange}
                                />{' '}
                                Academic Advisor
                              </label>
                              <label className="ml-3" style={{marginRight:"1em"}}>
                                <input
                                  type="checkbox"
                                  name="contribution"
                                  value="Any Other"
                                  checked={student.contribution.includes('Any Other')}
                                  onChange={handleCheckboxChange}
                                />{' '}
                                Any Other (Please specify)
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Photo */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Choose Photo</label>
                            <input
                              type="file"
                              className="form-control-file"
                              name="photo"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="form-actions mt-10">
                        <button type="submit" className="btn btn-primary">
                          <i className="fa fa-check"></i> Save
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleCancel}>
                          Cancel
                        </button>
                      </div>
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

export default NewStudentForm;
