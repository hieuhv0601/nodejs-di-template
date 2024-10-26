const sendResponse = (
  res,
  success,
  data,
  message,
  statusCode = 200,
  error = null
) => {
  if (!success) {
    if (Array.isArray(message)) {
      return res.status(statusCode).json({
        error: {
          status: statusCode,
          messages: message,
        },
      });
    }

    return res.status(statusCode).json({
      error: {
        status: statusCode,
        message: message,
      },
    });
  }
  return res.status(statusCode).json(data);
  // return res.status(statusCode).json({
  //   success: success,
  //   data: data,
  //   message: message,
  // });
};

module.exports = sendResponse;
