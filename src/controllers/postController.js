import { createPostService } from '../services/postService.js';
import cloudinary from '../config/cloudinaryConfig.js';
import fs from 'fs/promises';

export const createPost = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required!',
      });
    }
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp'];
    if (!allowedFileTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only images are allowed!',
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'img',
    });
    fs.rm(`uploads/${req.file.filename}`);

    // Create the post
    const post = await createPostService({
      caption: req.body.caption,
      image: result.secure_url, 
    });

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'CloudinaryError') {
      return res.status(500).json({
        success: false,
        message: 'Image upload failed!',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!!',
    });
  }
};

