import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB(process.env.MONGO_URI || "mongodb://mongo-service:27017/authdb");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.json({ service: "auth-service", status: "ok" }));

app.use(errorHandler);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`⚡ Auth Service listening on ${PORT}`));
