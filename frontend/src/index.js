import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";

import App from "./App";
import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import theme from "./theme";

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);
