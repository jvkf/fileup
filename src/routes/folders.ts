import express from 'express';
import * as foldersController from '../controllers/foldersController';
import * as uploadController from '../controllers/uploadController';

const router = express.Router();

router.get('/', foldersController.getFolders);
router.post('/', foldersController.createFolder);
router.get('/:folderId', foldersController.getFolder);
router.get('/:folderId/edit', foldersController.editFolderGET);
router.put('/:folderId', foldersController.editFolderPUT);
router.delete('/:folderId', foldersController.deleteFolder);
router.post('/:folderId/upload', uploadController.uploadFile);

export default router;
