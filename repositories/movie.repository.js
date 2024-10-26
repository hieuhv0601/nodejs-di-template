const Movie = require("../models/movies.model");

class MovieRepository {
  // Fetch all movies
  async getAllMovies() {
    return await Movie.find()
      .populate({
        path: "producer",
        select: "name",
        transform: (doc) => doc && doc.name,
      })
      .populate({
        path: "director",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      })
      .populate({
        path: "stars",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      });
  }

  // Fetch a movie by ID
  async getMovieById(id) {
    return await Movie.findById(id)
      .populate({
        path: "producer",
        select: "name",
        transform: (doc) => doc && doc.name,
      })
      .populate({
        path: "director",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      })
      .populate({
        path: "stars",
        select: "fullName",
        transform: (doc) => doc && doc.fullName,
      });
  }

  // Fetch movies by title (case-insensitive search)
  async getMoviesByTitle(title) {
    return await Movie.find({ title: { $regex: new RegExp(title, "i") } })
      .populate({
        path: "producer",
        select: "name",
        transform: (doc) => doc && doc.name,
      })
      .populate({
        path: "director",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      })
      .populate({
        path: "stars",
        select: "fullName",
        transform: (doc) => doc && doc.fullName,
      });
  }

  // Create a new movie
  async createMovie(movieData) {
    const newMovie = new Movie(movieData);
    return await newMovie.save();
  }

  // Update an existing movie by ID
  async updateMovie(id, updateData) {
    return await Movie.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "producer",
        select: "name",
        transform: (doc) => doc && doc.name,
      })
      .populate({
        path: "director",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      })
      .populate({
        path: "stars",
        select: "fullName",
        transform: (doc) => doc && doc.fullName,
      });
  }

  // Delete a movie by ID
  async deleteMovie(id) {
    return await Movie.findByIdAndDelete(id);
  }

  async getMoviesByStar(starId) {
    return await Movie.find({ stars: starId })
      .populate({
        path: "producer",
        select: "name",
        transform: (doc) => doc && doc.name,
      })
      .populate({
        path: "director",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      })
      .populate({
        path: "stars",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      });
  }

  // Count movies by a single star ID
  async countMoviesByStarId(starId) {
    const count = await Movie.countDocuments({ stars: starId });
    return count;
  }

  // Count movies by both star ID and director ID
  async countMoviesByStarAndDirectorId(starId, directorId) {
    return await Movie.countDocuments({
      stars: starId,
      director: directorId,
    });
  }

  // Generic count function to count movies by various criteria
  async countMoviesByCriteria(criteria) {
    return await Movie.countDocuments(criteria);
  }

  async addStarsToMovie(movieId, starIds) {
    return await Movie.findByIdAndUpdate(
      movieId,
      { $addToSet: { stars: { $each: starIds } } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "producer",
        select: "name",
        transform: (doc) => doc && doc.name,
      })
      .populate({
        path: "director",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      })
      .populate({
        path: "stars",
        select: "fullname",
        transform: (doc) => doc && doc.fullname,
      });
  }
}

module.exports = MovieRepository;
