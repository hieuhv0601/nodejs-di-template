const CustomError = require("../utils/custom.error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  }

  // For other unexpected errors
  res.status(500).json({
    error: {
      status: 500,
      message: "Internal Server Error",
    },
  });
};

module.exports = errorHandler;
