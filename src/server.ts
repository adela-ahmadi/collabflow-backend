import app from "./app";
import config from "./config";
import connectDB from "./config/db";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);

    process.exit(1);
  }
};

startServer();
