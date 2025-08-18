import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import journalRoutes from "./routes/authRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(errorHandler);
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);

app.get("/", (req, res) => res.send("app is running "));
const startServer = async () => {
  try {
    await dbConnection(process.env.DB_URI);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (error) {
    console.error(" Error starting server:", error.message);
    process.exit(1);
  }
};
startServer();
export default app;
