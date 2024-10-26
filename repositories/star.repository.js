const Star = require("../models/stars.model");

class StarRepository {
  async isStarIdValid(id) {
    return await Star.findById(id);
  }

  async getStarByName(name) {
    return await Star.findOne({ fullname: name });
  }

  async getStarIdByName(name) {
    return await Star.findOne({ fullname: name }).select("_id");
  }
}

module.exports = StarRepository;
