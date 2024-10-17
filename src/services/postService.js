import {
  countAllPosts,
  createPost,
  deletePostById,
  findAllPost,
  findAllPostPaginated,
  findPostById,
  updatePost,
} from '../repositories/postRepository.js';

export const createPostService = async (createPostObj) => {
  try {
    const caption = createPostObj.caption?.trim();
    const image = createPostObj.image;
    const post = await createPost(caption, image);
    return post;
  } catch (err) {
    console.log(err);
  }
};

export const getAllPostService = async () => {
  try {
    const getPost = await findAllPost();
    return getPost;
  } catch (err) {
    console.log(err);
  }
};

export const getAllPostInPaginatedService = async (offset, limit) => {
  const posts = await findAllPostPaginated(offset, limit);
  const totalDocuments = await countAllPosts();

  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    posts,
    totalDocuments,
    totalPages,
  };
};

export const updatePostService = async (id, postObj) => {
  const updatedPost = await updatePost(id, postObj);
  return updatedPost;
};

export const deletePostService = async (id) => {
  const response = await deletePostById(id);
  return response;
};

export const findSinglePost = async (id) => {
  const response = await findPostById(id);
  return response;
};
