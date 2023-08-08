import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, weight, temperament }) {
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img className={style.img} src={image} alt="" />
      </div>
      <Link to={`/detail/${id}`}>
        <div className={style.breedName}>
          <h1>{name}</h1>
        </div>
      </Link>
      <div className={style.descrContainer}>
        <div>Weight: {weight} kg</div>
        <div>Temperaments: {temperament}</div>
      </div>
    </div>
  );
}
