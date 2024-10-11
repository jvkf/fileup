import { UploadApiResponse } from 'cloudinary';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import cloudinary from '../config/cloudinary';
import prisma from '../config/db-client';
import { sendRenderedError } from '../utils/errorUtils';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadFile = [
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const { folderId } = req.params;
    const { name } = req.body;
    const uploadedFile = req.file as Express.Multer.File;
    const userId = res.locals.currentUser?.id;

    const folder = await prisma.folder.findUnique({
      where: {
        id: Number(folderId),
        userId,
      },
    });

    if (!folder) {
      return sendRenderedError(res, 404, 'Folder not found');
    }

    const fileExtension = path.extname(uploadedFile.originalname).slice(1);

    try {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: userId.toString(),
              resource_type: 'auto',
              format: fileExtension,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as UploadApiResponse);
              }
            }
          );
          stream.end(uploadedFile.buffer);
        }
      );

      if (!uploadResult) {
        throw new Error('Cloudinary upload failed.');
      }

      await prisma.$transaction([
        prisma.file.create({
          data: {
            name,
            path: uploadResult.secure_url,
            size: uploadedFile.size,
            folder: {
              connect: {
                id: Number(folderId),
              },
            },
          },
        }),
      ]);

      res.redirect(`/user/folders/${Number(folderId)}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      return sendRenderedError(res, 500, 'Error uploading file.');
    }
  }),
];
