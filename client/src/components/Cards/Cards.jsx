import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import style from "./Cards.module.css";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Cards() {
  // Las razas se obtienen desde el estado global de redux "breeds"
  const breeds = useSelector((state) => state.breeds);

  // Estos estados sirven para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [breedsPerPage] = useState(8);

  // Con estas variables calculamos y definimos las breeds que iran apareciendo en cada pagina
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed);

  // Sera la que ejecute el cambio de pagina cada vez que se clickea en un numero del pagiando.
  // Se la pasa por props al componente paginate
  const paginate = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Filters />
      <div className={style.cardsContainer}>
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
      <Pagination
        breedsPerPage={breedsPerPage}
        totalBreeds={breeds.length}
        paginate={paginate}
      />
    </>
  );
}
