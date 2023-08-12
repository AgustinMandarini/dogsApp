import style from "./Filters.module.css";
import {
  getAllBreeds,
  getTemperaments,
  filter_by_temp,
  filter_by_origin,
  sortBy,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Navbar(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  const temperaments = useSelector((state) => state.temperaments);

  const onClick = () => {
    dispatch(getAllBreeds());
  };

  const handleSortBy = async (event) => {
    dispatch(sortBy(event.target.value));
  };

  const handleTempFilter = (event) => {
    dispatch(filter_by_temp(event.target.value));
  };

  const handleOriginFilter = (event) => {
    dispatch(filter_by_origin(event.target.value));
  };

  return (
    <nav className={style.filtersNav}>
      <div className={style.filterContainer}>
        <select className={style.filterTemperament} onChange={handleTempFilter}>
          <option value="All">All</option>
          {temperaments.map((temp) => {
            return <option value={temp}>{temp}</option>;
          })}
        </select>
        <select className={style.filterOrigin} onChange={handleOriginFilter}>
          <option value="All">All</option>
          <option value="Created by User">Created by User</option>
          <option value="API">API</option>
        </select>
        <select className={style.sortBy} onChange={handleSortBy}>
          <option value="Sorty by">Sort by</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Lighter to Heavier">Lighter to Heavier</option>
          <option value="Heavier to Lighter">Heavier to Lighter</option>
        </select>
        <button className={style.resetButton} onClick={onClick}>
          Reset
        </button>
      </div>
    </nav>
  );
}
