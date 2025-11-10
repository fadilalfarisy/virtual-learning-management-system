import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Management Learning System",
      version: "1.0.0",
      description: "This is an API management virtual learning system",
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/docs/paths/*.yaml"],
};

const documentation = new Router();
const swaggerSpec = swaggerJSDoc(swaggerOptions);

documentation.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, { customCssUrl: process.env.CSS_URL })
);

export { documentation };
