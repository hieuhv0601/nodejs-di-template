const Producer = require("../models/producers.model");

class ProducerRepository {
  async isProducerIdValid(id) {
    return await Producer.findById(id);
  }
}

module.exports = ProducerRepository;
