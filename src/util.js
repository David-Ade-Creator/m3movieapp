const config = require("../src/config");
const JWT = require("jsonwebtoken");

module.exports = {
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      return next(
        res.status(404).json({
          status: "fail",
          message: "Unauthorized access",
        })
      );
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, config.JWT_SECRET, (err, payload) => {
      if (err) {
        return next(
          res.status(404).json({
            status: "fail",
            message: "Invalid Token",
          })
        );
      }
      const user = payload._doc;
      req.verifiedUser = user;
      next();
    });
  },
};
