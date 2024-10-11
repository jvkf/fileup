import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.loginUserGET);
router.post(
  '/',
  userController.loginUserPOST,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  })
);

export default router;
