// Async error wrapper - catches errors and passes to next()
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};