import { validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(400);
    res.send({ message: "Data is missing." });
  }
};

export { validateResult };
