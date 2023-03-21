const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router");

const app = express();

// cookie-parser
app.use(cookieParser());

// Acces control allow origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// use some application-level middlewares
app.use(
  cors({
    origin:
      // process.env.FRONTEND_URL ??
      // "http://localhost:3000" ??
      "https://lighthearted-stroopwafel-baa966.netlify.app",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export
module.exports = app;
