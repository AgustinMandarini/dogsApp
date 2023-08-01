import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./helpers/routesPath";
import Cards from "./components/Cards/Cards";
import NewBreedForm from "./components/NewBreedForm/NewBreedForm";
import Nav from "./components/Nav/Nav";
import { useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== ROUTES.LANDING && <Nav />}

      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />}></Route>
        <Route path={ROUTES.HOME} element={<Cards />}></Route>
        <Route path={ROUTES.NEW_BREED} element={<NewBreedForm />}></Route>
      </Routes>
    </>
  );
}

export default App;
