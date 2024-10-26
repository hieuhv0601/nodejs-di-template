const Validator = require("../validators/validator");
const CustomError = require("../utils/custom.error");
const ProducerRepository = require("../repositories/producer.repository");
const DirectorRepository = require("../repositories/director.repository");
const StarRepository = require("../repositories/star.repository");

class ValidationService {
  constructor() {
    this.producerRepository = new ProducerRepository();
    this.directorRepository = new DirectorRepository();
    this.starRepository = new StarRepository();
  }

  // Validate Producer ID
  async validateProducerId(producerId) {
    Validator.validateObjectId(producerId, "producer");
    const isProducerValid = await this.producerRepository.isProducerIdValid(
      producerId
    );
    if (!isProducerValid) {
      throw new CustomError(400, "Producer not found");
    }
  }

  // Validate Director ID
  async validateDirectorId(directorId) {
    Validator.validateObjectId(directorId, "director");
    const isDirectorValid = await this.directorRepository.isDirectorIdValid(
      directorId
    );
    if (!isDirectorValid) {
      throw new CustomError(400, "Director not found");
    }
  }

  // Validate Star IDs
  async validateStarIds(starIds) {
    Validator.isArray(starIds, "stars");
    for (const starId of starIds) {
      Validator.validateObjectId(starId, "star");
      const isStarValid = await this.starRepository.isStarIdValid(starId);
      if (!isStarValid) {
        throw new CustomError(400, `Star not found with ID: ${starId}`);
      }
    }
  }
}

module.exports = ValidationService;
