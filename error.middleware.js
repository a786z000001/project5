module.exports = function errorMiddleware(err, req, res, next) {
  console.error("🔥 INTERNAL ERROR:", err.stack || err);

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
};
