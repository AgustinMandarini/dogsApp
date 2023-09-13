import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { getAllBreeds } from "./redux/actions/actions";
import { Provider } from "react-redux";
import { Auth0ProviderWithNavigate } from "../src/components/Authentication/auth0-provider-with-navigate";

// Esta linea a continuacion permite traer todas las breeds SOLO UNA VEZ, cuando se inicia la aplicacion, y de esta forma lograr que los
// filtros persistan y no se sobrescriban. Anteriormente, esta linea estaba en el useEffect del componente que renderiza, pero
// eso hacia que cada vez que se monte el componente, las breeds se sobreescribieran.
store.dispatch(getAllBreeds());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
