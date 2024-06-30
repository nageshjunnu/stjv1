import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of contacts per page

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://kyroes.in/st-josephs/api/contact/');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (filteredContacts.length === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filteredContacts]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedContacts = filteredContacts.length > 0 ? filteredContacts.slice(startIndex, endIndex) : contacts.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredContacts.length > 0 ? filteredContacts.length / itemsPerPage : contacts.length / itemsPerPage);

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">Contacts</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <i className="mdi mdi-home-outline"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Contacts
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="table-container">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.subject}</td>
                    <td>{contact.message}</td>
                    <td>{contact.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({ length: pageCount }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => onPageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default ContactList;
