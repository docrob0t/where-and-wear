import React from "react";
import { Route, Switch } from "react-router-dom";
import Map from "./components/Map";
import UrlError from "./components/UrlError";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Map} />
      <Route component={UrlError} />
    </Switch>
  );
}

export default App;
