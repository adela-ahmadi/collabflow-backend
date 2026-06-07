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
        Task: {
          type: "object",

          required: ["title", "workspace"],

          properties: {
            title: {
              type: "string",
              example: "Build authentication UI",
            },

            description: {
              type: "string",
              example: "Create login and register pages",
            },

            workspace: {
              type: "string",
              example: "665c123456789abcdef12345",
            },

            assignedTo: {
              type: "string",
              example: "665c123456789abcdef12346",
            },

            status: {
              type: "string",
              enum: ["TODO", "IN_PROGRESS", "DONE"],
              example: "TODO",
            },

            priority: {
              type: "string",
              enum: ["LOW", "MEDIUM", "HIGH"],
              example: "HIGH",
            },
          },
        },
        TaskResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",
              example: true,
            },

            message: {
              type: "string",
              example: "Task created successfully",
            },

            data: {
              $ref: "#/components/schemas/Task",
            },
          },
        },
        ErrorResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",
              example: false,
            },

            message: {
              type: "string",
              example: "Validation failed",
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
