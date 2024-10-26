const mongoose = require("mongoose");
const CustomError = require("../utils/custom.error");

class Validator {
  // Validate if a given ID is a valid ObjectId
  static validateObjectId(id, entityName) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(400, `Invalid ${entityName} ID: ${id}`);
    }
  }

  // Validate if a given value is a valid email
  static isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new CustomError(400, `Invalid email format: ${email}`);
    }
  }

  // Validate if a given value is a number
  static isNumber(value, entityName) {
    if (isNaN(value)) {
      throw new CustomError(400, `${entityName} must be a number`);
    }
  }

  // Validate if a string is not empty
  static isNotEmptyString(value, entityName) {
    if (!value || typeof value !== "string" || value.trim() === "") {
      throw new CustomError(400, `${entityName} cannot be an empty string`);
    }
  }

  // Validate if a given value is an array
  static isArray(value, entityName) {
    if (!Array.isArray(value)) {
      throw new CustomError(400, `${entityName} must be an array`);
    }
  }
}

module.exports = Validator;
