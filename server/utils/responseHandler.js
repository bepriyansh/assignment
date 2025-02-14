export const createResponse = (res, status, message, data) => {
  res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
};

export const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

export const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Internal Server Error";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
};

export const notFound = (req, res) => {
  res.status(404).json({ error: "The Api endpoint you've requested doesn't exist" });
};
