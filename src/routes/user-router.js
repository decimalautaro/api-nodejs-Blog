const {Router} = require("express");
const  UserController = require("../controllers/UserController");
const { validateRegister, validateLogin } = require("../validators/validate-user")
const routerUser= Router();

/** 
 * @openapi 
 * /users/register:
 *      post:
 *          tags:
 *              - users 
 *          summary: "Registrando usuario"
 *          description: Registrando un usuario con su nombre, email y password
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
 *                  description: Error al crear el usuario.
 * 
 */
routerUser.post("/register", validateRegister ,UserController.register );


/** 
 * @openapi 
 * /users/login:
 *      post:
 *          tags:
 *              - users 
 *          summary: "Logeando usuario"
 *          description: Logeando un usuario con su email y password
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/users"
 *          responses:
 *              "200":
 *                  description: Usuario logeado con exito.
 *              "400":
 *                  description: Faltan datos por enviar.
 *              "404":
 *                  description: Error al logear el usuario.
 * 
 */
routerUser.post("/login", validateLogin ,UserController.login );

module.exports = {routerUser};