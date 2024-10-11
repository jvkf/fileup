import asyncHandler from 'express-async-handler';
import prisma from '../config/db-client';
import { sendJsonError, sendRenderedError } from '../utils/errorUtils';

export const getFolders = asyncHandler(async (req, res) => {
  const folders = await prisma.folder.findMany({
    where: {
      userId: res.locals.currentUser.id,
    },
  });

  res.render('folders/index', { folders });
});

export const getHomeFolders = asyncHandler(async (req, res) => {
  if (!res.locals.currentUser) {
    return res.render('index');
  }

  const folders = await prisma.folder.findMany({
    where: {
      userId: res.locals.currentUser.id,
    },
  });

  res.render('index', { folders });
});

export const getFolder = asyncHandler(async (req, res, next) => {
  const { folderId } = req.params;
  const folderWithFiles = await prisma.folder.findUnique({
    where: {
      id: Number(folderId),
      userId: res.locals.currentUser.id,
    },
    include: {
      files: true,
    },
  });

  if (!folderWithFiles) {
    return sendRenderedError(res, 404, 'Folder not found');
  }

  const { files, ...folder } = folderWithFiles;

  res.render('folder/index', { folder, files });
});

export const createFolder = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const folder = await prisma.folder.create({
    data: {
      name,
      user: {
        connect: {
          id: res.locals.currentUser.id,
        },
      },
    },
  });

  res.redirect('/user/folders');
});

export const editFolderGET = asyncHandler(async (req, res, next) => {
  const { folderId } = req.params;
  const folder = await prisma.folder.findUnique({
    where: {
      id: Number(folderId),
      userId: res.locals.currentUser.id,
    },
  });

  if (!folder) {
    return sendRenderedError(res, 404, 'Folder not found');
  }

  res.render('folders/edit', { folder });
});

export const editFolderPUT = asyncHandler(async (req, res, next) => {
  const { folderId } = req.params;
  const { name } = req.body;

  try {
    const folder = await prisma.folder.update({
      where: {
        id: Number(folderId),
        userId: res.locals.currentUser.id,
      },
      data: {
        name,
      },
    });

    res.status(200).json({ message: '✅ Folder updated successfully' });
  } catch (error) {
    return sendJsonError(res, 400, 'general_error', 'Failed to update folder');
  }
});

export const deleteFolder = asyncHandler(async (req, res, next) => {
  const { folderId } = req.params;

  try {
    await prisma.folder.delete({
      where: {
        id: Number(folderId),
        userId: res.locals.currentUser.id,
      },
    });

    res.status(200).json({ message: '✅ Folder deleted successfully' });
  } catch (error) {
    return sendJsonError(res, 400, 'general_error', 'Failed to delete folder');
  }
});
