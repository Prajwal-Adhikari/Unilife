exports.getTest = async (req, res, next) => {
  res.status(200).json({
    message: "Test API is working",
  });
};

// exports.getTest = (err, req, res, next) => {
//   const statusCode = 200;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//   });
// };
