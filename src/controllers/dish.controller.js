import { v2 as cloudinary } from 'cloudinary';
import Dish from '../models/dish.js';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Function to upload image from buffer
const uploadFromBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: 'super_menu',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(file.data).pipe(cld_upload_stream);
  });
};

// Controller function to register a dish
export const registerDish = async (req, res) => {
  try {
    if (!req.files || !req.files.picture) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadFromBuffer(req.files.picture);
    const picture = result.url;

    const { name, description, price, isAvailable, category, menuId } = req.body;

    if (!name || !description || !price || !isAvailable || !category || !menuId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newDish = await Dish.create({
      name,
      description,
      price,
      isAvailable,
      category,
      menuId,
      picture,
    });

    res.status(201).json({ newDish });
  } catch (error) {
    console.error('Error creating dish:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Export the dish controller
const dishController = {
    registerDish,
};

export default dishController;