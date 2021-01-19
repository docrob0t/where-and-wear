import React from "react";
import { Route, Switch } from "react-router-dom";
import Map from "./Map";
import { CssBaseline } from "@material-ui/core";
import UrlError from "./UrlError";

function App() {
  return (
    <div className="app">
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Map} />
        <Route component={UrlError} />
      </Switch>
    </div>
  );
}

export default App;
