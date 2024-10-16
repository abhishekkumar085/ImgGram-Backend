import {
  createPostService,
  getAllPostService,
} from '../services/postService.js';
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
    const allowedFileTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
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
export const getAllPost = async (req, res) => {
  try {
    const posts = await getAllPostService();

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No posts found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Posts retrieved successfully!',
      posts,
    });
    
  } catch (error) {
    console.error('Error retrieving posts:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message, 
    });
  }
};

