import { handleHttpError } from "../utils/handleError.js";
import { verifyToken } from "../utils/handleJWT.js";
import { User } from "../models/Users.js";

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "One session is needed.", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHttpError(res, "Token ID error.", 401);
      return;
    }
    const user = await User.findById(dataToken._id);
    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "Unauthorized session", 401);
  }
};

export { authMiddleware };
