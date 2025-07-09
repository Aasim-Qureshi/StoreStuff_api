import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AppError } from "../utils/AppError";

// Resolve the uploads directory relative to this file
const uploadDir = path.resolve(__dirname, '../../uploads');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the resolved absolute path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB limit
};

export const upload = multer({ storage, limits });
