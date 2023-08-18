import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import style from "./Cards.module.css";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_current_page } from "../../redux/actions/actions";

export default function Cards() {
  const dispatch = useDispatch();
  // Las razas se obtienen desde el estado global de redux "breeds"
  const breeds = useSelector((state) => state.breeds);

  // Estos estados sirven para el paginado
  const currentPage = useSelector((state) => state.currentPage);
  const [breedsPerPage] = useState(8);

  // Con estas variables calculamos y definimos las breeds que iran apareciendo en cada pagina
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed);
  const totalPages = Math.ceil(breeds.length / breedsPerPage);

  // Sera la que ejecute el cambio de pagina cada vez que se clickea en un numero del pagiando.
  // Se la pasa por props al componente paginate
  const paginate = (page) => {
    // console.log(totalPages);
    // console.log(page);

    dispatch(set_current_page(page % (totalPages + 1)));
  };
  return (
    <>
      <Filters />
      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className={style.cardsContainer}>
        {console.log(currentBreeds)}
        {currentBreeds.map((breed) => (
          <Card
            key={breed.id}
            id={breed.id}
            image={breed.image}
            name={breed.name}
            weight={breed.weight}
            temperament={breed.temperament}
          />
        ))}
      </div>
    </>
  );
}
