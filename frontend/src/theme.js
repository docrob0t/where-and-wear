import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: ["Poppins", '"Open Sans"', "Roboto"].join(","),
    },
  })
);

export default theme;
