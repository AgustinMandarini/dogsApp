import { Link } from "react-router-dom";
import { ROUTES } from "../../helpers/routesPath";

const LandingPage = (props) => {
  return (
    <div>
      <h1>"LANDING PAGE"</h1>
      <h2>
        <Link to={ROUTES.HOME}>|HOME|</Link>
      </h2>
    </div>
  );
};

export default LandingPage;
