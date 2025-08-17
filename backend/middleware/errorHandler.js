export const errorHandler = (err, req, res, next) => {
  res.status(err.statuscode).json({
    success:false,
    msg:err.message,
  });
};
