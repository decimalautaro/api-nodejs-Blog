import { handleHttpError } from "../utils/handleError.js";

const checkRol = (rols) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;

    const checkValueRol = rols.some((rolSigngle) =>
      rolesByUser.includes(rolSigngle)
    );
    if (!checkValueRol) {
      handleHttpError(res, "Error the user does not have permissions.", 403);
      return;
    }

    next();
  } catch (error) {
    handleHttpError(res, "Permissions error.", 403);
  }
};

export { checkRol };
