const { path } = require("path");
const swaggerJsDoc = require("swagger-jsdoc");

/**
 * Configuration API
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentación de API para Blog.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      users: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      articles: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: {
            type: "string",
          },
          content: {
            type: "string",
          },
          image: {
            type: "string",
          },
        },
      },
    },
  },
};

/**
 *  Options
 */
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const openApiConfiguration = swaggerJsDoc(options);

module.exports = openApiConfiguration;
