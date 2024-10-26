const express = require("express");
function createMovieRouter(movieController) {
  const router = express.Router();

  // Bind controller methods to preserve `this` context
  const {
    getAllMovies,
    getMovieById,
    getMoviesByStar,
    createMovie,
    updateMovie,
    deleteMovie,
    countMoviesByStarName,
    addStarsToMovie,
  } = movieController;

  // Define routes
  router.get("/list", getAllMovies);
  router.get("/by-star/:id", getMoviesByStar);
  router.get("/count-by-star/:starName", countMoviesByStarName);
  router.get("/:id", getMovieById);
  router.post("/create", createMovie);
  router.put("/:id", updateMovie);
  router.delete("/:id", deleteMovie);
  router.post("/:movieId/add-stars", addStarsToMovie);
  return router;
}

module.exports = createMovieRouter;
