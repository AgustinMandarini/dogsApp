import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, weight, temperament }) {
  return (
    <div className={style.container}>
      <Link to={`/detail/${id}`}>
        <div className={style.breedName}>
          <h1>{name}</h1>
        </div>
      </Link>
      <img className={style.img} src={image} alt="" />
      <div>{weight}</div>
      <div>{temperament}</div>
    </div>
  );
}
