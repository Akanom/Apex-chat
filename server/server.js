import mongoose from "mongoose";
import config from "../config/config";
import app from "./express";


mongoose.Promise = global.Promise;

console.log("Attempting to connect to database:", config.mongoUri);

mongoose.connect(config.mongoUri, { autoIndex: false })
  .then(() => {
    console.log("Connected to database:", config.mongoUri);
    app.listen(config.port, (err) => {
      if (err) {
        console.error("Error starting server:", err);
      } else {
        console.info("Server started on port %s.", config.port);
      }
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

