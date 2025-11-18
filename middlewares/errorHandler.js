module.exports = function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ ok: false, error: 'Internal Server Error' });
};
