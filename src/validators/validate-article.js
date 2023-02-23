const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateArticle = [
  check("title").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("content").exists().notEmpty().isLength({ min: 3, max: 2000 }),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

module.exports = { validateArticle };
