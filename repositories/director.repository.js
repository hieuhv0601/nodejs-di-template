const Director = require("../models/directors.model");

class DirectorRepository {
  async isDirectorIdValid(id) {
    return await Director.findById(id);
  }

  async getDirectorByName(name) {
    return await Director.findOne({ fullname: name });
  }
  async getDirectorIdByName(name) {
    return await Director.findOne({ fullname: name }).select("_id");
  }
}

module.exports = DirectorRepository;
