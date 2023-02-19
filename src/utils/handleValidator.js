const { validationResult } = require("express-validator");

const validateResult = (req, res, next) =>{
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(400);
        res.send({message: "Faltan datos por enviar."});
    }
}

module.exports = { validateResult }