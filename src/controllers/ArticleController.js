const Article = require("../models/Articles");
const { validateArticle } = require("../helpers/validate");

const create = (req, res) =>{
    const params = req.body;

    try{
        
        validateArticle(params)

    }catch (error) {
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
const remove = (req, res)=>{
    const { id } = req.params;
    Article.findOneAndDelete({_id : id}, (error,articleRemove)=>{
        if(error || !articleRemove){
            
        return res.status(500).json({
            status:"error",
            article: articleRemove,
            message: "error al borrar el articulo"
        })
        }


        return res.status(200).json({
            status:"success",
            article: articleRemove,
            message: "articulo borrado"
        })
    }) 
}

const edit = (req, res) =>{
    const { id } = req.params;
    const params= req.body;

    try{
        
        validateArticle(params)
        
    }catch (error) {
        return res.status(400).json({
            status:"error",
            message: "faltan datos por enviar"
        })
    }
    
    Article.findOneAndUpdate({_id : id}, params, {new: true}, (error, articleUpdate)=>{
        
        if(error || !articleUpdate){
            return res.status(500).json({
                status: "error",
                message: "error al actualizar"
            })
        }
        
        return res.status(200).json({
            status: "success",
            article: articleUpdate
        })

    })


}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    remove
}
