import express from "express";
import multer from "multer";
import cors from "cors";
import { saveLocal } from "./storage.js";
import fs from "fs";

const UPLOAD_TMP = "/tmp/uploads";
const STORAGE_DIR = process.env.UPLOAD_DIR || "/data/uploads";

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/health", (req, res) => res.json({ status: "ok", service: "file-service" }));

// serve uploaded files
app.use("/files", express.static(STORAGE_DIR));

// create tmp folder
if (!fs.existsSync(UPLOAD_TMP)) fs.mkdirSync(UPLOAD_TMP, { recursive: true });

// multer setup
const upload = multer({ dest: UPLOAD_TMP, limits: { fileSize: 50 * 1024 * 1024 } });

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "file required" });
  const info = await saveLocal(req.file);
  res.status(201).json({ file: info });
});

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`File service running on ${PORT}`));
