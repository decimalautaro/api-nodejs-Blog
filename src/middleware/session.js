const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const User = require("../models/Users");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "Se necesita una sesión.", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHttpError(res, "Error en el ID del token.", 401);
      return;
    }
    const user = await User.findById(dataToken._id);
    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "Sesion no autorizada", 401);
  }
};

module.exports = { authMiddleware };
