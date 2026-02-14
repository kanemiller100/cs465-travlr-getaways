const express = require("express");
const path = require("path");
const hbs = require("hbs");

// The NEW app_api database connection (NOT app_server)
require("./app_api/models/db");

// Routers
const apiRouter = require("./app_api/routes/index");
const travelRouter = require("./app_server/routes/travel");

const app = express();

// Port
app.set("port", process.env.PORT || 3000);

// View engine (HBS)
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "app_server", "views", "partials"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static site assets (public html/css/images)
app.use(express.static(path.join(__dirname, "public")));

// MVC (server-rendered views)
app.use("/", travelRouter);

// REST API (JSON) — mounted at both /api and /API
app.use("/api", apiRouter);
app.use("/API", apiRouter);

// 404 handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler (API returns JSON; otherwise plain text)
app.use((err, req, res, next) => {
  const status = err.status || 500;

  if (req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/API")) {
    return res.status(status).json({
      message: err.message || "Server error"
    });
  }

  res.status(status);
  res.send(status === 404 ? "404 Not Found" : "Server Error");
});

// Start server
app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});

module.exports = app;
