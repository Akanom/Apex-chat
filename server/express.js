import express from "express";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import bodyParser from "body-parser";
import ReactDOMServer from "react-dom/server";
import React from "react";
import MainRouter from "./../client/MainRouter";
import { StaticRouter } from "react-router";
//  meant for development
//import devBundle from "./devBundle";
import path from "path";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "./../client/theme";


const CURRENT_WORKING_DIR = process.cwd();
const app = express();
//  meant for development
// devBundle.compile(app)

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
app.use(bodyParser.json()); // handles complexity of parsing req objects so that it can simplify communication
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress()); //compress all req bodies and tranverse through middleware
app.use(cookieParser()); //parse and set cookies
app.use(cors()); // enables cross-origin resource sharing
app.use(helmet()); // collect various middleware to enable various HTTP headers

app.get("*", (req, res) => {
  // res.status(200).send(Template());
  // Generate CSS styles using Material-UI ServerSheetSheets
  const sheets = new ServerStyleSheets();
  // Use renderToString to generate markup which renders components specific to the route requested
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      //stateless static router is used instead of the BrowserRouter
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  // Return template with markup and CSS styles in the response
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
});

//Mounting of API's
app.use("/", userRoutes);

// Mounting auth.routes
app.use("/", authRoutes);

//Error handling
//express-jwt throws an error whenever a token cannot be validated
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    //this error returns a 401 status to the cleint
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
