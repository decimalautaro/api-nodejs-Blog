import { check } from "express-validator";
import { validateResult } from "../utils/handleValidator.js";

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

export { validateRegister, validateLogin };
