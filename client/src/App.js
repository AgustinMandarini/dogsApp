import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./helpers/routesPath";
import Cards from "./components/Cards/Cards";

function App() {
  return (
    <>
      <div className="App">
        <h1>Henry Dogs</h1>
      </div>
      <Routes>
        <Route path={ROUTES.HOME} element={<Cards />}></Route>
      </Routes>
    </>
  );
}

export default App;
