import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate,currentPage,setCurrentPage }) => {
  const pageNumbers = [];
const nPages = Math.ceil(totalPosts / postsPerPage);
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push(i);
  }
  const nextPage = (e) => {
    if(currentPage !== nPages) 
    {
      setCurrentPage(currentPage + 1);}
      e.preventDefault()
}
const prevPage = (e) => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
      e.preventDefault()

    }
        
}

  return (
    <div>
      <nav>
        <ul className="pagination">
        <li className="page-item">
            <a className="page-link" onClick={prevPage} href="!#">Previous</a>
          </li>
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
          <li className="page-item">
            <a className="page-link" onClick={nextPage} href="!#">Next</a>
          </li>
        </ul>
        
      </nav>
    </div>
  );
};

export default Pagination;
