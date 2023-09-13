import path from "path";
import swaggerJsDoc from "swagger-jsdoc";

/**
 * Configuration API
 */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation for Blog.",
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

export default openApiConfiguration;
