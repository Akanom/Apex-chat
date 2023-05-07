import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import MainRouter from "./MainRouter";
import { hot } from "react-hot-loader";

const App = () => {
  // Once the code has been rendered on the server side and it gets to the browser, remove the
  //server side injected css
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default hot(module)(App);
