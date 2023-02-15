const swaggerJsDoc = require("swagger-jsdoc");

/**
 *  Opciones
 */
const swaggerDefinition ={
    openapi: "3.0.0",
    info: {
        title: "Documentacion de API para Blog.",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000/api/articles"
        }
    ],
    components: {

        schemas: {
            Article:{
                type: "object",
                required: ["title, content"],
                properties:{
                    title:{
                        type: "string"
                    },
                    content:{
                        type: "string"
                    },
                    date:{
                        type: "date",
                    },
                    image:{
                        type: "string",
                        
                    }
                }
            }
        }
    }
}


/**
 *  Opciones
 */
const options = {
    swaggerDefinition,
    apis:[
        "./routes/*.js"
    ]
};

const openApiConfiguration = swaggerJsDoc (options)




module.exports = openApiConfiguration