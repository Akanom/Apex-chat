import config from "./../config/config";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
