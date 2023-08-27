const express = require("express");
const dotenv = require("dotenv");
// const logger = require("./middlewear/logger");
const morgan = require("morgan");
const colors = require("colors");
const mongoSanitize = require("express-mongo-sanitize");
const fileupload = require("express-fileupload");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewear/error");
const path = require("path");

const connectDB = require("./config/db");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();
// Routes files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

// body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Dev logging middleewear
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File upload
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attack
app.use(xss());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollutions
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

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
