import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedByName } from "../../redux/actions/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setName(event.target.value);
  };
  const onSearch = (name) => {
    dispatch(getBreedByName(name));
  };

  return (
    <div className={style.searchbarContainer}>
      <input
        className={style.searchbarInput}
        placeholder="Search Golden Retriever, Bulldog, etc..."
        type="search"
        value={name}
        onChange={handleInputChange}
      />

      <button
        className={style.searchButton}
        onClick={(event) => onSearch(name)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
