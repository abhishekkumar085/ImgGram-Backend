import Post from '../schema/post.js';

export const createPost = async (caption, image, user) => {
  try {
    // const post = await Post.create({ caption, image, user });
    const post = new Post({ caption, image, user });
    await post.save();
    return post;
  } catch (err) {
    console.log(err);
  }
};
export const findAllPost = async () => {
  try {
    const post = await Post.find();
    return post;
  } catch (error) {
    console.log(error);
  }
};
export const findPostById = async (id) => {
  try {
    const post = await Post.findById(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const findByPostByUserId = async (userId) => {
  try {
    const posts = await Post.find({ user: userId });
    if (posts.length === 0) {
      throw new Error('No posts found for this user');
    }
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const deletePostById = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};
