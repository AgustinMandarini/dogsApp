import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";
import { URL_PROD, URL_DEV } from "../../fakeEnv";

const Detail = (props) => {
  const { id } = useParams();
  const [breed, setBreed] = useState([]);

  useEffect(() => {
    axios.get(`${URL_DEV}/dogs/${id}`).then(({ data }) => {
      if (data.name) {
        console.log(data);
        setBreed(data);
      } else {
        window.alert("There are no breeds matching the requested ID");
      }
    });
    return setBreed({});
  }, [id]);
  return (
    <div className={style.detailContainer}>
      <div className={style.detailContent}>
        <img className={style.img} src={breed?.image} alt="breed" />
        <div>
          <h1>{breed.name}</h1>
          <h2>
            Name: <span className={style.name}>{breed?.name}</span>
          </h2>
          <h2>
            Height: <span className={style.span}>{breed?.height}</span>
          </h2>
          <h2>
            Weight: <span className={style.span}>{breed?.weight}</span>
          </h2>
          <h2>
            Life Span: <span className={style.span}>{breed?.life_span}</span>
          </h2>
          <h2>
            Temperaments:{" "}
            <span className={style.span}>{breed.temperament}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Detail;
