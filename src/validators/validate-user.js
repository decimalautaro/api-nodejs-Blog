const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

const validateLogin = [
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

module.exports = { validateRegister, validateLogin };
