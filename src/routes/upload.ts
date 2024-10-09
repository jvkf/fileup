import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', (req, res) => {
  res.render('upload/index');
});

router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.redirect('/upload');
});

export default router;
