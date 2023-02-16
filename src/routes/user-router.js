const {Router} = require("express");
const  UserController = require("../controllers/UserController");

const routerUser= Router();

/**
 * @openapi
 * /all-users/:
 *  get:
 *      tags:
 *          - users
 *      summary: "listar usuarios"
 *      description: Se obtienen todos los usuarios creados
 *      responses:
 *          "200":
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/users"
 *          "404":
 *              description: "No se encontraron los usuarios."
 */
routerUser.get("/all-users/", UserController.getAll );

/** 
 * @openapi 
 * /byId/{id}:
 *      get:
 *          tags:
 *              - users 
 *          summary: "Detalle del usuario"
 *          description: Obteniendo un usuario especifico
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *          responses:
 *              "200":
 *                  description: Usuario encontrado.
 *              "404":
 *                  desccription: Error al encontrar el usuario.
 * 
 */
routerUser.get("/byId/:id", UserController.getById );

/** 
 * @openapi 
 * /create-user:
 *      post:
 *          tags:
 *              - users 
 *          summary: "creando usuario"
 *          description: Creando un usuario especifico
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/users"
 *          responses:
 *              "200":
 *                  description: Usuario creado con exito.
 *              "400":
 *                  description: Faltan datos por enviar.
 *              "404":
 *                  desccription: Error al crear el usuario.
 * 
 */
routerUser.post("/create-user",UserController.create );

/** 
 * @openapi 
 * /delete-user/{id}:
 *      delete:
 *          tags:
 *              - users 
 *          summary: "eliminar usuario"
 *          description: Eliminar a un usuario especifico
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *          responses:
 *              "200":
 *                  description: Usuario eliminado con exito.
 *              "404":
 *                  desccription: Error al eliminar el usuario.
 * 
 */
routerUser.delete("/delete-user/:id",UserController.remove );

/**
 * @openapi
 * /edit-user/{id}:
 *    put:
 *      tags:
 *        - users
 *      summary: "Actualizando usuario"
 *      description: Actualizar usuario y obtener el detalle.
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el usuario actualizado en la coleccion.
 *        '404':
 *          description: Error al actualizar el usuario.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/users"
 *    responses:
 *      '200':
 *        description: Retorna el usuario insertado en la coleccion con stado '200'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/users'
 *      '404':
 *        description: No se pudo actualizar el usuario  '403'
 */
routerUser.put("/edit-user/:id",UserController.edit );

module.exports = {routerUser};