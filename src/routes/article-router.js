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

/** 
 * @openapi 
 * /{id}:
 *      get:
 *          tags:
 *              - articles 
 *          summary: "Detalle del articulo"
 *          description: Obteniendo un articulo especifico
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *          responses:
 *              "200":
 *                  description: Articulo encontrado.
 *              "404":
 *                  desccription: Error al encontrar el articulo
 * 
 */
routerArticle.get("/:id", ArticleController.getById );

/** 
 * @openapi 
 * /create:
 *      post:
 *          tags:
 *              - articles 
 *          summary: "creando articulo"
 *          description: Creando un articulo especifico
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/articles"
 *          responses:
 *              "200":
 *                  description: Articulo creado con exito.
 *              "404":
 *                  desccription: Error al crear el articulo
 * 
 */
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

/**
 * @openapi
 * /edit/{id}:
 *    put:
 *      tags:
 *        - articles
 *      summary: "Actualizando articulo"
 *      description: Actualizar articulo y obtener el detalle del registro
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el articulo actualizado en la coleccion.
 *        '404':
 *          description: Error al actualizar el articulo.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/articles"
 *    responses:
 *      '200':
 *        description: Retorna el articulo insertado en la coleccion con stado '200'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/articles'
 *      '404':
 *        description: No se pudo actualizar el registro '403'
 */
routerArticle.put("/edit/:id",ArticleController.edit );

/**
 * @openapi
 * /upload-image/{id}:
 *      post:
 *          tags:
 *              - articles
 *          summary: "subiendo imagen"
 *          description: subiendo una imagen a un articulo especifico.
 *          parameters:     
 *          - name: id
 *            in: path
 *            required: true
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              file:
 *                                  type: string
 *                                  format: binary
 *          responses:
 *              "200":
 *                  description: Retorna la imagen insertada en el articulo.
 *              "404":
 *                  description: Error al cargar la foto.
 *                              
 *          
 *      
 */
routerArticle.post("/upload-image/:id",[upload.single("file")],ArticleController.uploadImage );

/** 
 * @openapi 
 * /image/{file}:
 *      get:
 *          tags:
 *              - articles 
 *          summary: "Buscar imagen"
 *          description: Obteniendo un imagen del listado de articulos
 *          parameters:
 *          - name: file
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *          responses:
 *              "200":
 *                  description: Imagen encontrada.
 *              "404":
 *                  desccription: Error al encontrar la imagen.
 * 
 */
routerArticle.get("/image/:file", ArticleController.image );
routerArticle.get("/search/:search", ArticleController.search );


module.exports = {routerArticle};