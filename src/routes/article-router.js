import { Router } from "express";
import {
  getAll,
  getById,
  create,
  edit,
  remove,
  uploadImage,
  image,
  search,
} from "../controllers/ArticleController.js";
import { validateArticle } from "../validators/validate-article.js";
import { authMiddleware } from "../middleware/session.js";
import { checkRol } from "../middleware/rol.js";

import multer from "multer";

const routerArticle = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images/articles/");
  },
  filename: (req, file, cb) => {
    cb(null, "article" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

/**
 * @openapi
 * /articles/all-items:
 *  get:
 *      tags:
 *          - articles
 *      summary: "listar articulos"
 *      description: Se obtienen todos los articulos creados.
 *      security:
 *          - bearerAuth: []
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
routerArticle.get("/all-items", getAll);

/**
 * @openapi
 * /articles/byId/{id}:
 *      get:
 *          tags:
 *              - articles
 *          summary: "Detalle del articulo"
 *          description: Obteniendo un articulo especifico.
 *          security:
 *              - bearerAuth: []
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
routerArticle.get("/byId/:id", getById);

/**
 * @openapi
 * /articles/create-article:
 *      post:
 *          tags:
 *              - articles
 *          summary: "creando articulo"
 *          description: Creando un articulo especifico.
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/articles"
 *          responses:
 *              "200":
 *                  description: Articulo creado con exito.
 *              "400":
 *                  desccription: Faltan datos por enviar.
 *
 *              "404":
 *                  desccription: Error al crear el articulo
 *
 */
routerArticle.post(
  "/create-article",
  authMiddleware,
  checkRol(["admin"]),
  validateArticle,
  create
);

/**
 * @openapi
 * /articles/delete-article/{id}:
 *      delete:
 *          tags:
 *              - articles
 *          summary: "eliminar articulos"
 *          description: Eliminar un articulo especifico.
 *          security:
 *              - bearerAuth: []
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
routerArticle.delete(
  "/delete-article/:id",
  authMiddleware,
  checkRol(["admin"]),
  remove
);

/**
 * @openapi
 * /articles/edit-article/{id}:
 *    put:
 *      tags:
 *        - articles
 *      summary: "Actualizando articulo"
 *      description: Actualizar articulo y obtener el detalle del registro.
 *      security:
 *          - bearerAuth: []
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
routerArticle.put(
  "/edit-article/:id",
  validateArticle,
  authMiddleware,
  checkRol(["admin"]),
  edit
);

/**
 * @openapi
 * /articles/upload-image/{id}:
 *      post:
 *          tags:
 *              - articles
 *          summary: "subiendo imagen"
 *          description: subiendo una imagen a un articulo especifico.
 *          security:
 *              - bearerAuth: []
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
routerArticle.post(
  "/upload-image/:id",
  [upload.single("file")],
  authMiddleware,
  checkRol(["admin"]),
  uploadImage
);

/**
 * @openapi
 * /articles/image/{file}:
 *      get:
 *          tags:
 *              - articles
 *          summary: "Buscar imagen"
 *          description: Obteniendo un imagen del listado de articulos.
 *          security:
 *              - bearerAuth: []
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
routerArticle.get("/image/:file", authMiddleware, image);

/**
 * @openapi
 * /articles/search/{search}:
 *      get:
 *          tags:
 *              - articles
 *          summary: "Buscar titulo o contenido"
 *          description: Obteniendo un titulo o contenido de la lista de articulos.
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          - name: search
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *          responses:
 *              "200":
 *                  description: Busqueda realizada con exito.
 *              "404":
 *                  desccription: Error al realizar la busqueda.
 *
 */
routerArticle.get("/search/:search", search);

export { routerArticle };
