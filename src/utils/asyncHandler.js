const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
    next(err);
  }
};

export { asyncHandler };

// Using Promise

// const asyncHandleqr = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };
