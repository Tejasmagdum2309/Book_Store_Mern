import multer from 'multer';
import path from 'path';

// Define the storage path based on the environment
const storagePath = process.env.UPLOAD_PATH || 'public/temp';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, storagePath));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ 
  storage, 
});
