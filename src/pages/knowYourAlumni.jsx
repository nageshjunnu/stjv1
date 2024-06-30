import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useRouter } from 'next/router';
import Image from 'next/image';

const KnowYourAlumni = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [fromYearFilter, setFromYearFilter] = useState('');
  const [toYearFilter, setToYearFilter] = useState('');
  const [yearOptions, setYearOptions] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of students per page

  // Retrieve degree from local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('usersData'));
    const degreeFilter = storedData?.data?.degree || '';

    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://kyroes.in/st-josephs/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const fetchYearOptions = async () => {
      try {
        const response = await axios.get('https://kyroes.in/st-josephs/api/student-stats/');
        const { category_counts } = response.data;
        const options = category_counts.map(item => item.batchstart).sort();
        setYearOptions(options);
        setCategoryCounts(category_counts);
      } catch (error) {
        console.error('Error fetching year options:', error);
      }
    };

    fetchStudents();
    fetchYearOptions();

    // Filtering logic
    let filteredData = students;
    if (degreeFilter) {
      filteredData = filteredData.filter(student => student.degree === degreeFilter);
    }
    if (fromYearFilter) {
      filteredData = filteredData.filter(student => student.batchstart >= fromYearFilter);
    }
    if (toYearFilter) {
      filteredData = filteredData.filter(student => student.batchend <= toYearFilter);
    }
    setFilteredStudents(filteredData);

  }, [fromYearFilter, toYearFilter, students]);

  const exportToExcel = () => {
    const dataToExport = filteredStudents.length > 0 ? filteredStudents : students;
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'students.xlsx');
  };

  const exportToPDF = () => {
    const dataToExport = filteredStudents.length > 0 ? filteredStudents : students;
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Photo', 'Student ID', 'Name', 'Gender', 'Batch Start', 'Batch End', 'Degree', 'Mobile', 'Email', 'Company', 'Roles', 'Institution', 'Industries', 'Address', 'Program', 'Roll Number']],
      body: dataToExport.map(student => [
        student.photo,
        student.student_id,
        student.name,
        student.gender,
        student.batchstart,
        student.batchend,
        student.degree,
        student.mobile,
        student.email,
        student.company,
        student.roles,
        student.institution,
        student.industries,
        `${student.address}, ${student.city}, ${student.state}, ${student.pincode}`,
        student.program,
        student.roll_number
      ])
    });
    doc.save('students.pdf');
  };

  const handleRowClick = (studentId) => {
    router.push(`/students/${studentId}`);
    localStorage.setItem("studentId", studentId);
  };

  const handleFromYearFilterChange = (event) => {
    setFromYearFilter(event.target.value);
  };

  const handleToYearFilterChange = (event) => {
    setToYearFilter(event.target.value);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedStudents = filteredStudents.length > 0 ? filteredStudents.slice(startIndex, endIndex) : students.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredStudents.length > 0 ? filteredStudents.length / itemsPerPage : students.length / itemsPerPage);

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">Know Your Alumni</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#"><i className="mdi mdi-home-outline"></i></a></li>
                    <li className="breadcrumb-item active" aria-current="page">Know Your Alumni</li>
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
                <div className="box-header">
                  <h4 className="box-title">Alumni Profiles</h4>
                  <div className="box-tools float-end">
                    <CSVLink data={students} filename={"students.csv"} className="btn btn-primary btn-sm me-2">Export CSV</CSVLink>
                    <button onClick={exportToExcel} className="btn btn-primary btn-sm me-2">Export Excel</button>
                    <button onClick={exportToPDF} className="btn btn-primary btn-sm">Export PDF</button>
                  </div>
                </div>
                <div className="box-body">
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label htmlFor="fromYearFilter" className="form-label">From Year:</label>
                      <select
                        id="fromYearFilter"
                        className="form-select"
                        value={fromYearFilter}
                        onChange={handleFromYearFilterChange}
                      >
                        <option value="">All</option>
                        {yearOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="toYearFilter" className="form-label">To Year:</label>
                      <select
                        id="toYearFilter"
                        className="form-select"
                        value={toYearFilter}
                        onChange={handleToYearFilterChange}
                      >
                        <option value="">All</option>
                        {yearOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <div className="table-wrapper">
                      <table className="table table-bordered table-striped table-hover">
                        <thead className="sticky-top">
                          <tr>
                            <th>Photo</th>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Batch Start</th>
                            <th>Batch End</th>
                            <th>Degree</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Roles</th>
                            <th>Institution</th>
                            <th>Industries</th>
                            <th>Address</th>
                            <th>Program</th>
                            <th>Roll Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedStudents.map(student => (
                            <tr key={student.student_id} onClick={() => handleRowClick(student.student_id)}>
                              <td>
                                <Image className="img-fluid" src={student.photo ? `https://kyroes.in/st-josephs/controllers/uploads/${student.photo}` : "/../images/avatar/375x200/2.jpg"} height={50} width={50} alt={student.name} />
                              </td>
                              <td>{student.student_id}</td>
                              <td>{student.name}</td>
                              <td>{student.gender}</td>
                              <td>{student.batchstart}</td>
                              <td>{student.batchend}</td>
                              <td>{student.degree}</td>
                              <td>{student.mobile}</td>
                              <td>{student.email}</td>
                              <td>{student.company}</td>
                              <td>{student.roles}</td>
                              <td>{student.institution}</td>
                              <td>{student.industries}</td>
                              <td>{`${student.address}, ${student.city}, ${student.state}, ${student.pincode}`}</td>
                              <td>{student.program}</td>
                              <td>{student.roll_number}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        {Array.from({ length: pageCount }, (_, index) => (
                          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => onPageChange(index + 1)}>{index + 1}</button>
                          </li>
                        ))}
                      </ul>
                    </nav>
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

export default KnowYourAlumni;
