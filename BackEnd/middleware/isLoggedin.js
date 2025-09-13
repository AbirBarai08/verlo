const ExpressError = require("../Utils/ExpressError.js")

module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    return next();
  }

  next(new ExpressError(501 , "You must be logged in to access this route"));
};