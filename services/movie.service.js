const MovieRepository = require("../repositories/movie.repository");
const StarRepository = require("../repositories/star.repository");
const DirectorRepository = require("../repositories/director.repository");
const ProducerRepository = require("../repositories/producer.repository");
const CustomError = require("../utils/custom.error");
const ValidationService = require("./validation.service");
const VALID_GENRES = ["Action", "Comedy", "Cartoon", "Drama"];
class MovieService {
  constructor() {
    this.movieRepository = new MovieRepository();
    this.starRepository = new StarRepository();
    this.directorRepository = new DirectorRepository();
    this.producerRepository = new ProducerRepository();
    this.validationService = new ValidationService();
  }

  // Normalize genre strings by capitalizing the first letter and making the rest lowercase
  normalizeGenre(genre) {
    return genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
  }

  // Validate and normalize genres in the service layer
  validateGenres(genres) {
    if (!genres || !Array.isArray(genres)) {
      throw new CustomError(400, "Genres must be an array");
    }

    // Normalize the genres and validate them
    const normalizedGenres = genres.map((genre) => this.normalizeGenre(genre));

    // Check if all normalized genres are in the list of valid genres
    const invalidGenres = normalizedGenres.filter(
      (genre) => !VALID_GENRES.includes(genre)
    );
    if (invalidGenres.length > 0) {
      throw new CustomError(400, `Invalid genres: ${invalidGenres.join(", ")}`);
    }

    return normalizedGenres;
  }

  // Get all movies
  async getAllMovies() {
    return await this.movieRepository.getAllMovies();
  }

  // Get movie by ID
  async getMovieById(id) {
    if (!id) throw new CustomError(400, "Movie ID is required");
    const movie = await this.movieRepository.getMovieById(id);
    if (!movie) throw new CustomError(404, "Movie not found");
    return movie;
  }

  // Get movies by title
  async getMoviesByTitle(title) {
    if (!title) throw new CustomError(400, "Title is required for searching");
    return await this.movieRepository.getMoviesByTitle(title);
  }

  // Create a new movie
  async createMovie(movieData) {
    if (!movieData.title) throw new CustomError(400, "Movie title is required");
    if (!movieData.release)
      throw new CustomError(400, "Release date is required");
    if (!movieData.producer) throw new CustomError(400, "Producer is required");
    if (movieData.genres) {
      movieData.genres = this.validateGenres(movieData.genres);
    }
    await this.validationService.validateProducerId(movieData.producer);
    await this.validationService.validateDirectorId(movieData.director);
    if (movieData.stars && movieData.stars.length > 0) {
      await this.validationService.validateStarIds(movieData.stars);
    }

    return await this.movieRepository.createMovie(movieData);
  }

  // Update movie
  async updateMovie(id, movieData) {
    if (!id) throw new CustomError(400, "Movie ID is required");
    const updatedMovie = await this.movieRepository.updateMovie(id, movieData);
    if (!updatedMovie)
      throw new CustomError(404, "Movie not found or could not be updated");
    return updatedMovie;
  }

  // Delete movie
  async deleteMovie(id) {
    if (!id) throw new CustomError(400, "Movie ID is required");
    const deletedMovie = await this.movieRepository.deleteMovie(id);
    if (!deletedMovie)
      throw new CustomError(404, "Movie not found or could not be deleted");
    return deletedMovie;
  }

  // Get movies by star
  async getMoviesByStar(starId) {
    if (!starId) throw new CustomError(400, "Star ID is required");
    return await this.movieRepository.getMoviesByStar(starId);
  }

  // Count movies by star name
  async countMoviesByStarName(starName) {
    if (!starName) throw new CustomError(400, "Star name is required");

    // Step 1: Fetch the star by name
    const star = await this.starRepository.getStarByName(starName);
    if (!star) throw new CustomError(404, "Star not found");

    // Step 2: Count the number of movies referencing this star's ID
    const movieCount = await this.movieRepository.countMoviesByStarId(star._id);
    return movieCount;
  }

  // Count movies by star and director
  async countMoviesByStarAndDirector(starName, directorName) {
    if (!starName || !directorName)
      throw new CustomError(400, "Both star and director names are required");
    const starId = await this.starRepository.getStarIdByName(starName);
    const directorId = await this.directorRepository.getDirectorIdByName(
      directorName
    );
    return await this.movieRepository.countMoviesByStarAndDirectorId(
      starId,
      directorId
    );
  }

  async addStarsToMovie(movieId, starIds) {
    if (!movieId) throw new CustomError(400, "Movie ID is required");
    if (!starIds) throw new CustomError(400, "Star IDs are required");
    await this.validationService.validateStarIds(starIds);
    return await this.movieRepository.addStarsToMovie(movieId, starIds);
  }
}

module.exports = MovieService;
