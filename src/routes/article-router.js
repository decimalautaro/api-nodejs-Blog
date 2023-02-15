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


/**
 * @openapi
 * /:
 *  get:
 *      tags:
 *          - articles
 *      summary: "listar articulos"
 *      description: Se obtienen todos los articulos creados
 *      responses:
 *          "200":
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/articles"
 *          "404":
 *              description: "No se encontraron articulos."
 */
routerArticle.get("/", ArticleController.getAll );
routerArticle.get("/:id", ArticleController.getById );
routerArticle.post("/create",ArticleController.create );

/** 
 * @openapi 
 * /delete/{id}:
 *      delete:
 *          tags:
 *              - articles 
 *          summary: "eliminar articulos"
 *          description: Eliminar un articulo especifico
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *          responses:
 *              "200":
 *                  description: Articulo eliminado con exito.
 *              "404":
 *                  desccription: Error al eliminar el articulo
 * 
 */
routerArticle.delete("/delete/:id",ArticleController.remove );
routerArticle.put("/edit/:id",ArticleController.edit );
routerArticle.post("/upload-image/:id",[upload.single("file")],ArticleController.uploadImage );
routerArticle.get("/image/:file", ArticleController.image );
routerArticle.get("/search/:search", ArticleController.search );


module.exports = {routerArticle}