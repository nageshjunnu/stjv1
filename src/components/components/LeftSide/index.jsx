import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const LeftSide = () => {
    const [studentId, setStudentId] = useState(null);
    const [hasPkey, setHasPkey] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const usersData = JSON.parse(localStorage.getItem("usersData"));
            if (usersData) {
                if (usersData.data.pkey) {
                    setHasPkey(true);
                    setStudentId(usersData.data.student_id);
                }
                if (usersData.data.permission) {
                    setUserId(usersData.data.id);
                    setHasPermission(usersData.data.permission);
                }
            }
        }
    }, []);

    return (
        <aside className="main-sidebar">
            {/* <!-- sidebar--> */}
            <section className="sidebar position-relative">
                <div className="multinav">
                    <div className="">
                        {/* <!-- sidebar menu--> */}
                        <ul className="sidebar-menu" data-widget="tree">
                            <li className="header">Dashboard & Apps</li>
                            <li >
                                <Link href="/dashboard">
                                    <i className="icon-Layout-4-blocks">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                    <span>Dashboard</span>
                                    <span className="pull-right-container">
                                        {/* <i className="fa fa-angle-right pull-right"></i> */}
                                    </span>
                                </Link>
                            </li>
                            {hasPermission && <li className="treeview">
                                <Link href="#">
                                    <i className="icon-Layout-4-blocks">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                    <span>Students</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-right pull-right"></i>
                                    </span>
                                </Link>
                                <ul className="treeview-menu">
                                    {hasPermission && (
                                        <li>
                                        <Link href="/students">
                                            <i className="icon-Layout-4-blocks"></i> All Students
                                        </Link>
                                    </li>
                                    )}
                                    {hasPermission && hasPermission !== "view" &&
                                    <li>
                                    <Link href="/students/new-student">
                                        <i className="icon-Layout-4-blocks"></i> New Student
                                    </Link>
                                </li>
                                    }
                                </ul>
                            </li>}
                            
                            {hasPermission && (
                            <li className="treeview">
                                <Link href="#">
                                    <i className="icon-Layout-4-blocks">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                    <span>Users</span>
                                    <span className="pull-right-container">
                                        <i className="fa fa-angle-right pull-right"></i>
                                    </span>
                                </Link>
                                <ul className="treeview-menu">
                               
                                        <>
                                            <li>
                                                <Link href={`/users/${userId}`}>
                                                    <i className="icon-Layout-4-blocks"></i> View User
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/users/new-user">
                                                    <i className="icon-Layout-4-blocks"></i> Create User
                                                </Link>
                                            </li>
                                            {hasPermission === "full access" && (
                                                <li>
                                                    <Link href="/users">
                                                        <i className="icon-Layout-4-blocks"></i> All Users
                                                    </Link>
                                                </li>
                                            )}
                                        </>
                                    
                                </ul>
                            </li>
                            )}
                            {hasPermission && hasPermission !== "view" && (
                                <li className="treeview">
                                    <Link href="/contacts">
                                        <i className="icon-Layout-4-blocks">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                        </i>
                                        <span>Contacts</span>
                                        <span className="pull-right-container">
                                            {/* <i className="fa fa-angle-right pull-right"></i> */}
                                        </span>
                                    </Link>
                                </li>
                            )}
                            <li>
                                        {hasPkey && (
                                            <Link href={`/students/view-profile`}>
                                                 <i className="icon-Layout-4-blocks">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                        </i> View Profile
                                            </Link>
                                        ) }
                                    </li>
                                <li className="1">
                                    <Link href="/knowYourAlumni">
                                        <i className="icon-Layout-4-blocks">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                        </i>
                                        <span>Know Your Alumni</span>
                                        <span className="pull-right-container">
                                            {/* <i className="fa fa-angle-right pull-right"></i> */}
                                        </span>
                                    </Link>
                                </li>
                           
                        </ul>
                    </div>
                </div>
            </section>
            <div className="sidebar-footer">
                <Link href="javascript:void(0)" className="link" data-bs-toggle="tooltip" title="Settings">
                    <span className="icon-Settings-2"></span>
                </Link>
                <Link href="mailbox.html" className="link" data-bs-toggle="tooltip" title="Email">
                    <span className="icon-Mail"></span>
                </Link>
                <Link href="javascript:void(0)" className="link" data-bs-toggle="tooltip" title="Logout" onClick={() => { localStorage.clear() }}>
                    <span className="icon-Lock-overturning">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </span>
                </Link>
            </div>
        </aside>
    );
};

export default LeftSide;
