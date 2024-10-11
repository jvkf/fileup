import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import prisma from '../config/db-client';
import { sendJsonError, sendRenderedError } from '../utils/errorUtils';
import {
  validateCreateUserData,
  validateLoginUserData,
  validateUpdateNameData,
  validateUpdatePasswordData,
} from '../validations/user-validate';

export const createUserGET = asyncHandler((req, res, next) => {
  res.render('signup/index');
});

export const createUserPOST = asyncHandler(async (req, res, next) => {
  const formData = req.body;
  const validation = validateCreateUserData(formData);

  if (!validation.success) {
    return res.status(400).render('signup/index', {
      errors: validation.error.flatten().fieldErrors,
      formData: req.body,
    });
  }

  try {
    const hashedPwd = await bcrypt.hash(formData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: hashedPwd,
      },
    });

    res.redirect('/login');
  } catch (e) {
    const isEmailRepeated =
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';
    if (isEmailRepeated) {
      return res.status(400).render('signup/index', {
        errors: { email: ['Email already registered.'] },
        formData: req.body,
      });
    }
    throw e;
  }
});

export const loginUserGET = asyncHandler(async (req, res, next) => {
  const messages = req.session.messages;
  if (messages) {
    req.session.messages = undefined;
  }
  res.render('login/index', { messages });
});

export const loginUserPOST = asyncHandler(async (req, res, next) => {
  const formData = req.body;
  const validation = validateLoginUserData(formData);

  if (!validation.success) {
    const errors = {
      password: ['Try again'],
      ...validation.error.flatten().fieldErrors,
    };

    return res.status(400).render('login/index', {
      errors,
      formData: { email: req.body.email },
    });
  }

  next();
});

export const editUserGET = asyncHandler(async (req, res, next) => {
  res.render('user/index.ejs', {
    formData: { name: res.locals.currentUser.name },
  });
});

export const updateName = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const userId = res.locals.currentUser.id;
  const validation = validateUpdateNameData({ name });

  if (!validation.success) {
    res.status(400).json({
      status: 'form_error',
      field: 'name',
      errors: validation.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    res.locals.currentUser = updatedUser;
    res.status(200).json({
      status: 'success',
      message: '✅ Name updated successfully',
    });
  } catch (error) {
    console.error('Error updating user name:', error);
    return sendJsonError(
      res,
      500,
      'general_error',
      '❌ An error occurred while updating your name'
    );
  }
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { current_password, new_password } = req.body;
  const userId = res.locals.currentUser.id;

  const validation = validateUpdatePasswordData({
    current_password,
    new_password,
  });

  if (!validation.success) {
    res.status(400).json({
      status: 'form_error',
      field: 'password',
      errors: validation.error.flatten().fieldErrors,
    });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(
    current_password,
    res.locals.currentUser.password
  );
  if (!isPasswordCorrect) {
    res.status(400).json({
      status: 'form_error',
      field: 'password',
      errors: { current_password: ['Incorrect password'] },
    });
    return;
  }

  try {
    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    res.locals.currentUser = updatedUser;
    res.status(200).json({
      status: 'success',
      message: '✅ Password updated successfully',
    });
  } catch (error) {
    console.error('Error updating user password:', error);
    return sendJsonError(
      res,
      500,
      'general_error',
      '❌ An error occurred while updating your password'
    );
  }
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = res.locals.currentUser.id;

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        status: 'success',
        message: '✅ Your account has been deleted',
      });
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return sendJsonError(
      res,
      500,
      'general_error',
      '❌ An error occurred while deleting your account'
    );
  }
});
