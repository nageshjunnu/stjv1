import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import StudentDashboard from '../students/StudentDashboard';
import Link from 'next/link';

const Dashboard = () => {
    const router = useRouter();
    console.log(router, "router")
    const { token, sessionKey } = router.query;
    const [session, setSession] = useState("");
    const [tokenv, setToken] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [studentData, setStudentData] = useState(null); // State to store API response
    const [hasPkey, setHasPkey] = useState(false);
    // // Redirect to login page if query data is not available
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokens = localStorage.getItem('token');
            setToken(tokens);
            if (token === null || token === "") {
                // console.log(token, "=session")
                router.push('/');
            }
        }
    }, [tokenv]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const usersData = JSON.parse(localStorage.getItem("usersData"));
            if (usersData) {
                if (usersData.data.pkey) {
                    setHasPkey(true);
                }
            }
        }
    }, []);
    // Render loading or dashboard content based on query data availability

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get('https://kyroes.in/st-josephs/api/student-stats/');
                setStudentData(response.data); // Update state with API response
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call fetchData function when component mounts
    }, []); // Empty dependency array ensures useEffect runs only once

    // Function to render degree items dynamically
    // const renderDegreeItems = () => {
    //     if (!studentData) return null; // Return null if data is not fetched yet
    //     const colors = [
    //     'bg-primary-light', 'bg-secondary-light', 'bg-success-light',
    //     'bg-info-light', 'bg-warning-light', 'bg-danger-light',
    //     'bg-dark-light', 'bg-light-light'
    // ];
    //     return studentData.category_counts.map((degree, index) => (
    //         <div className="col-lg-4 col-12" key={index}>
    //             <Link href="#" className="box pull-up">
    //                 <div className="box-body">
    //                     <div className="d-flex align-items-center">
    //                         <div className="icon bg-primary-light rounded-circle w-60 h-60 text-center l-h-80">
    //                             <span className="fs-30 icon-Bulb1">
    //                                 <span className="path1"></span>
    //                                 <span className="path2"></span>
    //                                 <span className="path3"></span>
    //                                 <span className="path4"></span>
    //                             </span>
    //                         </div>
    //                         <div className="ms-15">
    //                             <h5 className="mb-0">{degree.degree}</h5>
    //                             <p className="text-fade fs-12 mb-0">Count: {degree.count}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </Link>
    //         </div>
    //     ));
    // }
    useEffect(() => {
        if (typeof window !== "undefined") {
            const usersData = JSON.parse(localStorage.getItem("usersData"));
                if (usersData.data.permission) {
                    setHasPermission(usersData.data.permission);
                }
        }
    }, []);
    const renderDegreeItems = () => {
        if (!studentData) return null; // Return null if data is not fetched yet
        const colors = [
            'bg-primary-light', 'bg-secondary-light', 'bg-success-light',
            'bg-info-light', 'bg-warning-light', 'bg-danger-light',
            'bg-dark-light', 'bg-light-light'
        ];
    
        return studentData.category_counts.map((degree, index) => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Select a random color
    
            return (
                <div className="col-lg-4 col-12" key={index} >
                    <Link href="#" className={`box pull-up ${randomColor}`}>
                        <div className={`box-body ${randomColor}`}>
                            <div className="d-flex align-items-center">
                                <div className={`icon rounded-circle w-60 h-60 text-center l-h-80`}>
                                    <span className="fs-30 icon-Bulb1">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                        <span className="path3"></span>
                                        <span className="path4"></span>
                                    </span>
                                </div>
                                <div className="ms-15">
                                    <h5 className="mb-0">{degree.degree}</h5>
                                    <p className="text-fade fs-12 mb-0">Count: {degree.count}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        });
    }
    
    
    
    if (!studentData) return null;
    const data = {
        labels: studentData.category_counts.map(degree => degree.degree),
        datasets: [
            {
                label: 'Degree Count',
                data: studentData.category_counts.map(degree => degree.count),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
                borderWidth: 1,
                barThickness: 20, // Set the bar thickness here
                maxBarThickness: 20 // Maximum bar thickness
                
                
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Degree'
                },
                grid: {
                    display: false // Hide vertical grid lines
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Count'
                },
                beginAtZero: true
            }
        }
    };
    return (
        <>
            {console.log(tokenv, "=tokenv")}
            {tokenv && !hasPkey  ? (
                <div className="content-wrapper">
                    <div className="container-full">
                        {/* <!-- Main content --> */}
                        <section className="content">
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="box no-shadow mb-0 bg-transparent">
                                        <div className="box-header no-border px-0">
                                            <h4 className="box-title">Your Courses</h4>
                                            <div className="box-controls pull-right d-md-flex d-none">
                                                <Link href="#">View All</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* Render degree items dynamically */}
                                        {renderDegreeItems()}

                                        {/* <div className="col-lg-6 col-12">
                                            <div className="box" onClick={() => { router.push("/students") }} style={{ cursor: "pointer" }}>
                                                <div className="box-header">
                                                    <h4 className="box-title">Total Students</h4>
                                                </div>
                                                <div className="box-body">
                                                    <h1>{studentData ? studentData.total_students : 'Loading...'}</h1>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="box-container">
                                            <Bar data={data} options={options} />
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-lg-6 col-12">
                                            <div className="box">
                                                <div className="box-header">
                                                    <h4 className="box-title">New Activity</h4>
                                                </div>
                                                <div className="box-body">
                                                    <div className="act-div">
                                                        <div className="bg-gray-100 p-15 rounded10 mb-20">
                                                            <div>
                                                                <span className="badge badge-sm badge-dot badge-warning me-5"></span>
                                                                Fuzzy Logic
                                                            </div>
                                                            <h4 className="my-20">Dont forget to submit the task!</h4>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div className="d-flex align-items-center">
                                                                    <img src="/assets/images/avatar/1.jpg" className="avatar avatar-sm me-10 avatar-pill" />
                                                                    <p className="text-fade fs-12 mb-0">Johen doe</p>
                                                                </div>
                                                                <p className="text-fade fs-12 mb-0">08 Nov 2020</p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-100 p-15 rounded10 mb-20">
                                                            <div>
                                                                <span className="badge badge-sm badge-dot badge-primary me-5"></span>
                                                                Biometric
                                                            </div>
                                                            <h4 className="my-20">Explain what do you know about<br /> Biometric! (&gt;100 words)</h4>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div className="d-flex align-items-center">
                                                                    <img src="/assets/images/avatar/2.jpg" className="avatar avatar-sm me-10 avatar-pill" />
                                                                    <p className="text-fade fs-12 mb-0">Mical doe</p>
                                                                </div>
                                                                <p className="text-fade fs-12 mb-0">08 Nov 2020</p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-100 p-15 rounded10 mb-20">
                                                            <div>
                                                                <span className="badge badge-sm badge-dot badge-warning me-5"></span>
                                                                Fuzzy Logic
                                                            </div>
                                                            <h4 className="my-20">Dont forget to submit the task!</h4>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div className="d-flex align-items-center">
                                                                    <img src="/assets/images/avatar/1.jpg" className="avatar avatar-sm me-10 avatar-pill" />
                                                                    <p className="text-fade fs-12 mb-0">Johen doe</p>
                                                                </div>
                                                                <p className="text-fade fs-12 mb-0">08 Nov 2020</p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-100 p-15 rounded10">
                                                            <div>
                                                                <span className="badge badge-sm badge-dot badge-primary me-5"></span>
                                                                Biometric
                                                            </div>
                                                            <h4 className="my-20">Explain what do you know about Biometric! (&gt;100 words)</h4>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div className="d-flex align-items-center">
                                                                    <img src="/assets/images/avatar/2.jpg" className="avatar avatar-sm me-10 avatar-pill" />
                                                                    <p className="text-fade fs-12 mb-0">Mical doe</p>
                                                                </div>
                                                                <p className="text-fade fs-12 mb-0">08 Nov 2020</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="box-footer text-center p-0">
                                                    <Link href="#" className="btn d-grid btn-primary-light">View all</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="box">
                                                <div className="box-header">
                                                    <h4 className="box-title">Statisics</h4>
                                                </div>
                                                <div className="box-body">
                                                    <h3 className="mt-0">24hr</h3>
                                                    <p className="text-fade fs-12">Hours Spend last week</p>
                                                    <div id="charts_widget_2_chart"></div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <Link className="box box-link-shadow text-center pull-up" href="javascript:void(0)">
                                                        <div className="box-body py-25 bg-info-light px-5">
                                                            <p className="fw-600 text-info">Courses in Progress</p>
                                                        </div>
                                                        <div className="box-body">
                                                            <h1 className="countnm fs-50 m-0">5</h1>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-6">
                                                    <Link className="box box-link-shadow text-center pull-up" href="javascript:void(0)">
                                                        <div className="box-body py-25 bg-info-light px-5">
                                                            <p className="fw-600 text-info">Forum Discussion</p>
                                                        </div>
                                                        <div className="box-body">
                                                            <h1 className="countnm fs-50 m-0">25</h1>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {
hasPermission && (
    <div className="col-xl-4 col-12">
    <div className="box no-shadow mb-0 bg-transparent">
        <div className="box-header no-border px-0">
            <h4 className="box-title">Students</h4>
            <div className="box-controls pull-right d-md-flex d-none">
                <Link href="/students">View All</Link>
            </div>
        </div>
    </div>
    <div>
        <div className="box bs-5 border-danger rounded pull-up">
            <div className="box-body">
                <div className="flex-grow-1">
                    <div className="d-flex align-items-center pe-2 justify-content-between">
                        <h4 >
                            Total Students
                        </h4>
                    </div>
                    <h1>{studentData ? studentData.total_students : 'Loading...'}</h1>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-10">
                    <div className="d-flex">
                        <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
                            <img src="/assets/images/avatar/avatar-1.png" className="h-50 align-self-end" alt="" />
                        </Link>
                        <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
                            <img src="/assets/images/avatar/avatar-3.png" className="h-50 align-self-end" alt="" />
                        </Link>
                        <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
                            <img src="/assets/images/avatar/avatar-4.png" className="h-50 align-self-end" alt="" />
                        </Link>
                    </div>
                    {/* <button type="button" className="waves-effect waves-circle btn btn-circle btn-dark"><i className="mdi mdi-plus"></i></button> */}
                    <button type="button" className="waves-effect waves-circle btn btn-circle btn-dark" onClick={() => { router.push("/students") }}>
                        <i className="mdi mdi-arrow-right"></i>
                    </button>

                </div>
            </div>
        </div>
        {/* <div className="box bs-5 border-primary rounded mb-10 pull-up">
<div className="box-body">	
<div className="flex-grow-1">	
  <div className="d-flex align-items-center pe-2 justify-content-between">							
      <h4 className="fw-500">
          Speaking club
      </h4>
      <div className="dropdown">
          <Link data-bs-toggle="dropdown" href="#" className="px-10 pt-5"><i className="ti-more-alt"></i></Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" href="#"><i className="ti-import"></i> Import</Link>
            <Link className="dropdown-item" href="#"><i className="ti-export"></i> Export</Link>
            <Link className="dropdown-item" href="#"><i className="ti-printer"></i> Print</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" href="#"><i className="ti-settings"></i> Settings</Link>
          </div>
      </div>						
  </div>
  <p className="fs-16">
      Thu 16 PM - 17 PM
  </p>
</div>							
<div className="d-flex align-items-center justify-content-between mt-10">
  <div className="d-flex">
      <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
          <img src="/assets/images/avatar/avatar-2.png" className="h-50 align-self-end" alt=""/>
      </Link>
      <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
          <img src="/assets/images/avatar/avatar-5.png" className="h-50 align-self-end" alt=""/>
      </Link>
      <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
          <img src="/assets/images/avatar/avatar-6.png" className="h-50 align-self-end" alt=""/>
      </Link>
  </div>
  <button type="button" className="waves-effect waves-circle btn btn-circle btn-dark"><i className="mdi mdi-plus"></i></button>
</div>
</div>					
</div> */}
    </div>
   
</div>
)
                                }
                               
                            </div>
                        </section>
                        {/* <!-- /.content --> */}
                    </div>
                </div>
            ) : (<StudentDashboard/>)}
        </>
    )
}

export default Dashboard