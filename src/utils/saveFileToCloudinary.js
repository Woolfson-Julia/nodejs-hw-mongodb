import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

try {
  cloudinary.v2.config({
    cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
    api_key: getEnvVar(CLOUDINARY.API_KEY),
    api_secret: getEnvVar(CLOUDINARY.API_SECRET),
  });
} catch (err) {
  console.warn(
    'Cloudinary config failed to initialize at startup:',
    err.message,
  );
}

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);

  return response.secure_url;
};
