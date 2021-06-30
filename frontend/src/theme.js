import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: ["Poppins", '"Open Sans"', "Roboto"].join(",")
    },
    palette: {
      text: {
        primary: "rgba(61,61,74,1)"
      }
    }
  })
);

export default theme;
