const {Router} = require("express");
const  ArticleController = require("../controllers/ArticleController");
const multer = require("multer");

const routerArticle = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./src/images/articles/");
    } ,
    filename: (req, file, cb)=>{
        cb(null, "article" + Date.now() + file.originalname);
    }
})

const upload = multer({storage: storage});

routerArticle.get("/", ArticleController.getAll );
routerArticle.get("/:id", ArticleController.getById );
routerArticle.post("/create",ArticleController.create );
routerArticle.delete("/delete/:id",ArticleController.remove );
routerArticle.put("/edit/:id",ArticleController.edit );
routerArticle.post("/upload-image/:id",[upload.single("file")],ArticleController.uploadImage );
routerArticle.get("/image/:file", ArticleController.image );






module.exports = {routerArticle}