import { blueGrey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3B5998",
      dark: "#2d4373",
      light: "#6d84b4",
      contrastText:"#fff",
    },
    secondary: {
      main: "#F58529",
      dark: "#DD2A7B",
      light: "#C13584",
      contrastText:"#000"
    },       
  },
  typography: {
   useNextVariants:true,
    },
  openTitle: "#C05984",
    protectedTitle:blueGrey["400"],
    type:"light",
});

export default theme;
