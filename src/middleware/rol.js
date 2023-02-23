const { handleHttpError } = require("../utils/handleError");

const checkRol = (rols) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;

    checkValueRol = rols.some((rolSigngle) => rolesByUser.includes(rolSigngle));
    if (!checkValueRol) {
      handleHttpError(res, "Error el usuario no tiene permisos.", 403);
      return;
    }

    next();
  } catch (error) {
    handleHttpError(res, "Error de permisos.", 403);
  }
};

module.exports = {
  checkRol,
};
