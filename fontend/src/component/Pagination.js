import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate,currentPage,nextLabel,handlePreviousLabel }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <a
                onClick={(e) =>{ 
                  paginate(number); 
                  e.preventDefault();}
                }
                href="!#"
                className={`page-link ${currentPage === number ? "active" : ""}`}
                >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
