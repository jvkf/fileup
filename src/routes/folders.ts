import express from 'express';
import * as foldersController from '../controllers/foldersController';

const router = express.Router();

router.get('/', foldersController.getFolders);

router.post('/', foldersController.createFolder);

router.get('/:id/edit', foldersController.editFolderGET);

router.put('/:id', foldersController.editFolderPUT);

router.delete('/:id', foldersController.deleteFolder);

export default router;
