const Article = require("../models/Articles");
const { validateArticle } = require("../helpers/validate");
const fs = require("fs");
const path = require("path");

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

const uploadImage = (req, res) =>{
    if(!req.file && !req.files){
        return res.status(404).json({
            status: "error",
            message: "Petición invalida."
        })
    }

    let archive = req.file.originalname;

    let archiveSplit = archive.split("\.")
    let archiveExtension = archiveSplit[1];

    if (archiveExtension != "png" && archiveExtension != "jpg" &&
        archiveExtension != "jpeg" && archiveExtension != "gif") {
        
            fs.unlink(req.file.path, (error)=>{
                return res.status(400).json({
                    status: "error",
                    message: "extension del archivo invalida."
                })
            })
    }
    else{

        const { id } = req.params;
    
    Article.findOneAndUpdate({_id : id}, {image: req.file.filename}, {new: true}, (error, articleUpdate)=>{
        
        if(error || !articleUpdate){
            return res.status(500).json({
                status: "error",
                message: "error al actualizar"
            })
        }
        
        return res.status(200).json({
            status: "success",
            article: articleUpdate,
            file: req.file
            })

        })
    }

}

const image = (req, res)=>{
    let file = req.params.file;
    let routePhysical = "./src/images/articles/"+file;
    
    fs.stat(routePhysical, (error,exist)=>{
        if (exist) {
            return res.sendFile(path.resolve(routePhysical))
        }else{
            return res.status(404).json({
                status: "error",
                message: "La imagen no existe",
                exist,
                file,
                routePhysical
            })
        }
    })

}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    remove,
    uploadImage,
    image
}
