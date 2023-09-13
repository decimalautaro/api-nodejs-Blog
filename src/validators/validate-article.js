import { check } from "express-validator";
import { validateResult } from "../utils/handleValidator.js";

const validateArticle = [
  check("title").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("content").exists().notEmpty().isLength({ min: 3, max: 2000 }),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

export { validateArticle };
