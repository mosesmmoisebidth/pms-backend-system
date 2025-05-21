import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0", // ✅ This must exist
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API documentation",
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1",
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
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
