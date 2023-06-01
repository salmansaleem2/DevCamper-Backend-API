const express = require("express");
const dotenv = require("dotenv");

// Routes files
const bootcamps = require("./routes/bootcamps");

// load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

const logger = (req, res, next) => {
  req.hello = "Hello World";
  console.log("Middlewear ran");
  next();
};

app.use(logger);

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
