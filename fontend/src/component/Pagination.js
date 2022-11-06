import React, { useState } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  const [offcet, setOffset] = useState(0);
  const pages = Math.ceil(totalPosts / postsPerPage);
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const firstPage = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };
  const lastPage = (e) => {
    e.preventDefault();
    if (currentPage !== pages) {
      setCurrentPage(pages);
    }
  };

  return (
    <div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={firstPage} href="!#">{`<<`}</a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={prevPage} href="!#">
              Previous
            </a>
          </li>
          {pageNumbers.map((number) => {
            return (
              <li className="page-item" key={number}>
                <a
                  onClick={(e) => {
                    paginate(number);
                    e.preventDefault();
                  }}
                  href="!#"
                  className={`page-link ${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </a>
              </li>
            );
          })}

          <li className="page-item">
            <a className="page-link" onClick={nextPage} href="!#">
              Next
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={lastPage} href="!#">{`>>`}</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
