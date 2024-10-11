import express from 'express';
import * as foldersController from '../controllers/foldersController';

const router = express.Router();

router.get('/', foldersController.getHomeFolders);

export default router;
