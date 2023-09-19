import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./helpers/routesPath";
import Cards from "./components/Cards/Cards";
import NewBreedForm from "./components/NewBreedForm/NewBreedForm";
import Nav from "./components/Nav/Nav";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";
import Profile from "./components/Profile/Profile";
import { PageLoader } from "./components/Authentication/PageLoader/page-loader";
import { AuthenticationGuard } from "./components/Authentication/authentication-guard";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const location = useLocation();
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <>
      {location.pathname !== ROUTES.LANDING && <Login />}
      {location.pathname !== ROUTES.LANDING && <Nav />}
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />}></Route>
        <Route path={ROUTES.HOME} element={<Cards />}></Route>
        <Route
          path={ROUTES.NEW_BREED}
          element={<AuthenticationGuard component={NewBreedForm} />}
        ></Route>
        <Route path={ROUTES.DETAIL} element={<Detail />}></Route>
        <Route
          path={ROUTES.PROFILE}
          element={<AuthenticationGuard component={Profile} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
