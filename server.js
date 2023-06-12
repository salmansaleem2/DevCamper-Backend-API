const express = require("express");
const dotenv = require("dotenv");
// const logger = require("./middlewear/logger");
const morgan = require("morgan");
const colors = require("colors");

const connectDB = require("./config/db");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();
// Routes files
const bootcamps = require("./routes/bootcamps");

const app = express();
const PORT = process.env.PORT || 5000;

// Dev logging middleewear
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const server = app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
