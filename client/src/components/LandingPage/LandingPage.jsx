import { Link } from "react-router-dom";
import { ROUTES } from "../../helpers/routesPath";
import style from "./LandingPage.module.css";

const LandingPage = (props) => {
  return (
    <div className={style.background}>
      <div className={style.welcomeContainer}>
        <div className={style.welcome}>
          <div className={style.title}>
            <h1>WELLCOME TO DOG'S BREEDS SITE</h1>
            <h3>
              Find between 256 different dog's breeds or add you personal ones
              to your database!
            </h3>
          </div>
          <h2>
            <Link to={ROUTES.HOME}>ENTER</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
