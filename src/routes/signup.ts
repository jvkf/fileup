import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.createUserGET);
router.post('/', userController.createUserPOST);

export default router;
