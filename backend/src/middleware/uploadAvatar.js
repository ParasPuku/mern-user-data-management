import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import multer from 'multer';

const avatarsDir = fileURLToPath(
  new URL('../../uploads/avatars/', import.meta.url)
);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    fs.mkdirSync(avatarsDir, { recursive: true });
    callback(null, avatarsDir);
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    callback(null, `${req.account.id}-${Date.now()}${ext}`);
  }
});

const fileFilter = (_req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
    return;
  }

  callback(new Error('Only image files are allowed'));
};

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

