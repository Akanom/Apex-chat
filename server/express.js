import express from "express";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes"

const app = express();

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
app.use("/",userRoutes)

export default app;
