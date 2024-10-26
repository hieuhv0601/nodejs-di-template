const sendResponse = require("../utils/response.helper");
const MovieService = require("../services/movie.service");
class MovieController {
  constructor() {
    this.movieService = new MovieService();
  }

  getAllMovies = async (req, res, next) => {
    try {
      const movies = await this.movieService.getAllMovies();
      sendResponse(res, true, movies, "Movies retrieved successfully");
    } catch (error) {
      next(error);
    }
  };

  getMovieById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await this.movieService.getMovieById(id);
      sendResponse(res, true, movie, "Movie retrieved successfully");
    } catch (error) {
      next(error);
    }
  };

  getMoviesByTitle = async (req, res, next) => {
    try {
      const { title } = req.query;
      const movies = await this.movieService.getMoviesByTitle(title);
      sendResponse(res, true, movies, "Movies retrieved successfully");
    } catch (error) {
      next(error);
    }
  };

  createMovie = async (req, res, next) => {
    try {
      const movieData = req.body;
      const newMovie = await this.movieService.createMovie(movieData);
      sendResponse(res, true, newMovie, "Movie created successfully", 201);
    } catch (error) {
      next(error);
    }
  };

  updateMovie = async (req, res, next) => {
    try {
      const { id } = req.params;
      const movieData = req.body;
      const updatedMovie = await this.movieService.updateMovie(id, movieData);
      sendResponse(res, true, updatedMovie, "Movie updated successfully");
    } catch (error) {
      next(error);
    }
  };

  deleteMovie = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.movieService.deleteMovie(id);
      sendResponse(res, true, null, "Movie deleted successfully", 204);
    } catch (error) {
      next(error);
    }
  };

  getMoviesByStar = async (req, res, next) => {
    try {
      const { id } = req.params;
      const movies = await this.movieService.getMoviesByStar(id);
      sendResponse(res, true, movies, "Movies retrieved successfully by star");
    } catch (error) {
      next(error);
    }
  };

  countMoviesByStarName = async (req, res, next) => {
    try {
      const { starName } = req.params;
      const count = await this.movieService.countMoviesByStarName(starName);
      sendResponse(
        res,
        true,
        { count },
        `Movies count retrieved successfully for star: ${starName}`
      );
    } catch (error) {
      next(error);
    }
  };

  addStarsToMovie = async (req, res, next) => {
    try {
      const { movieId } = req.params;
      const starIds = req.body;
      console.log(starIds);
      if (!Array.isArray(starIds) || starIds.length === 0) {
        throw new CustomError(400, "Star IDs must be a non-empty array");
      }

      const updatedMovie = await this.movieService.addStarsToMovie(
        movieId,
        starIds
      );
      sendResponse(
        res,
        true,
        updatedMovie,
        "Stars added to movie successfully"
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = MovieController;
