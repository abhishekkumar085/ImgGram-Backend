import {
  createPostService,
  deletePostService,
  findSinglePost,
  getAllPostInPaginatedService,
  getAllPostService,
  updatePostService,
} from '../services/postService.js';
import cloudinary from '../config/cloudinaryConfig.js';
import fs from 'fs/promises';

export const createPost = async (req, res) => {
  try {
    const userDetails = req.user;

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
      user: userDetails._id,
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

export const getAllPostInPaginatedForm = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    const paginatedPost = await getAllPostInPaginatedService(offset, limit);

    return res.status(200).json({
      success: true,
      message: 'All Posts fetched successfully!!',
      data: paginatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'something went wrong!!',
      error: err.message,
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const id = req.params.id;
    const postObj = req.body;
    const existingPost = await findSinglePost(id);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found!',
      });
    }
    if (existingPost.image) {
      const publicId = extractPublicId(existingPost.image);
      await cloudinary.uploader.destroy(publicId);
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'img',
      });
      postObj.image = result.secure_url;
      fs.rm(`uploads/${req.file.filename}`);
    }
    const response = await updatePostService(id, postObj);
    return res.status(200).json({
      success: true,
      message: 'Post updated successfully!',
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};
const extractPublicId = (imageUrl) => {
  const parts = imageUrl.split('/');
  return parts[parts.length - 1].split('.')[0];
};

export async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const response = await deletePostService(postId, req.user._id);
    console.log(response, 'cntr');
    console.log(req.user, 'user request');
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'post not found!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'post deleted successfullly!!',
      data: response,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
