import express from "express";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import bodyParser from "body-parser";
//  meant for development
//import devBundle from "./devBundle";
import path from "path";

const app = express();
//  meant for development
// devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd();

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
app.use(bodyParser.json()); // handles complexity of parsing req objects so that it can simplify communication
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress()); //compress all req bodies and tranverse through middleware
app.use(cookieParser()); //parse and set cookies
app.use(cors()); // enables cross-origin resource sharing
app.use(helmet()); // collect various middleware to enable various HTTP headers

app.get("/", (req, res) => {
  res.status(200).send(Template());
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
