class ResponseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ResponseError) {
    const { status, message } = err;
    return res.status(status).json({
      error: message,
    });
  }
  return res.status(500).json({
    error: "Something error",
  });
};

export default ResponseError;
