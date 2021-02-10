import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import theme from "./theme";

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);
