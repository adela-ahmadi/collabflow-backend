import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.send("CollabFlow API Running...");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});
app.use(globalErrorHandler);

export default app;
