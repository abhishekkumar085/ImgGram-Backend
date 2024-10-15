import { createPost } from '../repositories/postRepository.js';

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
