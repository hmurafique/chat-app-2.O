import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const STORAGE_DIR = process.env.UPLOAD_DIR || "/data/uploads";

export async function saveLocal(file) {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }

  const ext = path.extname(file.originalname);
  const filename = `${uuidv4()}${ext}`;
  const filepath = path.join(STORAGE_DIR, filename);

  await fs.promises.rename(file.path, filepath);

  return { original: file.originalname, stored: filename, path: filepath };
}
