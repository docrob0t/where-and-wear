import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";

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
