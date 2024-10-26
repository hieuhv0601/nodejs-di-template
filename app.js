const express = require("express");

const MovieController = require("./controllers/movie.controller");
const createMovieRouter = require("./routes/movie.routes");

const errorHandler = require("./middlewares/error-handle");

function createApp(dbClient) {
  const app = express();
  app.use(express.json());

  // Movie module setup
  const movieController = new MovieController();
  const movieRouter = createMovieRouter(movieController);

  // Define routes
  app.use("/api/movie", movieRouter);

  // Error handling middleware (for all routes)
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
