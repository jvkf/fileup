import asyncHandler from 'express-async-handler';
import prisma from '../config/db-client';

export const getFolders = asyncHandler(async (req, res, next) => {
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user?.id,
    },
  });

  res.render('folders/index', { folders });
});

export const createFolder = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const folder = await prisma.folder.create({
    data: {
      name,
      user: {
        connect: {
          id: req.user?.id,
        },
      },
    },
  });

  res.redirect('/user/folders');
});

export const editFolderGET = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const folder = await prisma.folder.findUnique({
    where: {
      id: Number(id),
      userId: req.user?.id,
    },
  });

  if (!folder) {
    throw new Error('Folder not found');
  }

  res.render('folders/edit', { folder });
});

export const editFolderPUT = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const folder = await prisma.folder.update({
    where: {
      id: Number(id),
      userId: req.user?.id,
    },
    data: {
      name,
    },
  });

  res.status(200).json({ message: '✅ Folder updated successfully' });
});

export const deleteFolder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await prisma.folder.delete({
    where: {
      id: Number(id),
      userId: req.user?.id,
    },
  });

  res.status(200).json({ message: '✅ Folder deleted successfully' });
});
