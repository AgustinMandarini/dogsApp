import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../helpers/routesPath";
import style from "./LandingPage.module.css";

const LandingPage = (props) => {
  const navigate = useNavigate();

  return (
    <div className={style.background}>
      <div className={style.welcomeContainer}>
        <div className={style.welcome}>
          <div className={style.title}>
            <h1 className={style.landingTitle}>WELLCOME TO DOOGYPEDIA SITE!</h1>
            <h3 className={style.subTitle}>
              Find more than 254 different dog's breeds with complete
              information about them. Create and add you own personal breeds to
              your database
            </h3>
            <button
              className={style.landingButton}
              onClick={() => navigate(ROUTES.HOME)}
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
