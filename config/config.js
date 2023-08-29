const config = {
  env: process.env.NODE_ENV || "development", // to differentiate between production and development mode
  port: process.env.PORT || 3000, // defines the listening port
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", // secret key used to sign into JWT
  // mongoUri:
  //   process.env.MONGODB_URI ||
  //   process.env.MONGO_HOST ||
  //   "mongodb://" +
  //     (process.env.IP || "localhost") +
  //     ":" +
  //     (process.env.MONGO_PORT || "27017") +
  //     "/apex-chat"
  mongoUri: "mongodb://127.0.0.1:27017/apex-chat"
}; // mongodb database location

module.exports = config;

