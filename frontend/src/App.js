import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Map from "./components/Map";
import UrlError from "./components/UrlError";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Map} />
        <Route component={UrlError} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
