const validator = require("validator")

const create = (req, res) =>{
    const {title, content, date, image } = req.body;

    try {
        let validarTitle = !validator.isEmpty(title);
        let validarContent = !validator.isEmpty(content);

        if(!validarContent || !validarTitle){
            throw new Error ("no se ha validado la informacion")
        }

    } catch (error) {
        return res.status(400).json({
            message: "faltan datos por enviar"
        })
    }


    return res.status(200).json({
        title,
        content,
        message: "ejecutado con exito"
    })
}

module.exports = {
    create
}
