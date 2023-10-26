import React from "react";
import "./Pagination.scss";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalUsers: number;
  paginate: (pageNumber: number) => void;
  usersPerPage: number;
  activePage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalUsers,
  paginate,
  usersPerPage,
  activePage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li
            onClick={() => paginate(pageNumber)}
            className={
              activePage === pageNumber
                ? "pagination__item active"
                : "pagination__item"
            }
            key={pageNumber}
          >
            <a href="!#" className="pagination__link">
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
