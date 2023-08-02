import style from "./Pagination.module.css";

const Pagination = ({ breedsPerPage, totalBreeds, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalBreeds / breedsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={style.pageContainers}>
        {pageNumbers.map((number) => (
          <li key={number} className={style.pageNumber}>
            <a onClick={() => paginate(number)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
