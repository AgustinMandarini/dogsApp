import Card from "../Card/Card";
import style from "./Cards.module.css";
import { useEffect } from "react";
import { URL_DEV } from "../../fakeEnv";
import { useDispatch, useSelector } from "react-redux";
import { getAllBreeds } from "../../redux/actions/actions";

export default function Cards() {
  const breeds = useSelector((state) => state.breeds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBreeds());
  }, []);

  return (
    <div className={style.cardsContainer}>
      {breeds.map((breed) => (
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
  );
}
