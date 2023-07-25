import axios from "axios";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import { useState, useEffect } from "react";
import { URL_DEV } from "../../fakeEnv";

export default function Cards() {
  const [breeds, setBreeds] = useState([]);

  const getAllBreeds = async () => {
    try {
      const { data } = await axios(URL_DEV);
      if (data.length) {
        setBreeds(data);
      }
    } catch (error) {
      window.alert("There was an error while obtaining breeds from server");
    }
  };
  useEffect(() => {
    getAllBreeds();
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
