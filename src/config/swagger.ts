import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "CollabFlow API",

      version: "1.0.0",

      description: "Project collaboration platform API",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },

  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
