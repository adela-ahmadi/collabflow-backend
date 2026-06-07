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

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Workspace: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "CollabFlow Team",
            },

            description: {
              type: "string",
              example: "Main collaboration workspace",
            },
          },
        },
        WorkspaceResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },

            message: {
              type: "string",
              example: "Workspace created successfully",
            },

            data: {
              $ref: "#/components/schemas/Workspace",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/**/*.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
