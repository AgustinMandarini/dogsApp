import style from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../helpers/RoutesPath";

export default function Navbar(props) {
  const location = useLocation();

  return (
    <nav>
      <div className={style.leftContainer}>
        <img src="/img/navLogo.png" alt="Breed's Logo" />
        <div className={style.links}>
          <Link to={ROUTES.HOME}>
            <span>|HOME|</span>
          </Link>
        </div>
      </div>
      <div className={style.rightContainer}>
        {location.pathname === ROUTES.HOME ? (
          <SearchBar
          // onSearch={props.onSearch}
          // randomCard={props.randomCard}
          // logout={props.logout}
          />
        ) : null}{" "}
      </div>
    </nav>
  );
}
