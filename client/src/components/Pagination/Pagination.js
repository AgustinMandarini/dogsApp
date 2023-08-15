import style from "./Pagination.module.css";

const Pagination = ({ paginate, currentPage, totalPages }) => {
  return (
    <nav className={style.paginationNavContainer}>
      <ul className={style.pageContainers}>
        <div
          className={style.triangleLeft}
          onClick={() => paginate(--currentPage)}
        ></div>
        <span>
          PAGE {currentPage} OF {totalPages}
        </span>
        <div
          className={style.triangleRight}
          onClick={() => paginate(++currentPage)}
        ></div>
      </ul>
    </nav>
  );
};

export default Pagination;
