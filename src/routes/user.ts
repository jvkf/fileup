import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.editUserGET);
router.put('/name', userController.updateName);
router.put('/password', userController.updatePassword);
router.delete('/', userController.deleteUser);

export default router;
