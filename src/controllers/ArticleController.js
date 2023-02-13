const validator = require("validator")
const Article = require("../models/Articles")

const create = (req, res) =>{
    const params = req.body;

    try {
        let validarTitle = !validator.isEmpty(params.title);
        let validarContent = !validator.isEmpty(params.content);

        if(!validarContent || !validarTitle){
            throw new Error ("no se ha validado la informacion")
        }

    } catch (error) {
        return res.status(400).json({
            status:"error",
            message: "faltan datos por enviar"
        })
    }

    const article = new Article(params);
    article.save((error)=>{
        if(error || !article){
            return res.status(400).json({
                status:"error",
                message: "no se ha guardado el articulo"
            })
        }
    })

    return res.status(200).json({
        status: "success",
        article: article,
        message: "articulo creado con exito"

    })
}

const getAll = (req, res) =>{
    const consulta = Article.find({}).sort({date:-1}).exec((error, articles)=>{
        if(error || !articles){
            return res.status(404).json({
                status:"error",
                message: "no se han encontrado articulos"
            })
        }

        return res.status(200).send({
            status:"success",
            articles

        })
    })
}

const getById = (req, res)=>{
    const {id} = req.params
    Article.findById(id, (error,article)=>{

        if(error || !article){
            return res.status(404).json({
                status:"error",
                message: "no se ha encontrado el articulo"
            })
        }
        res.status(200).json({
            status: "success",
            article
        })

    })
}

module.exports = {
    getAll,
    getById,
    create
}
