import Post from '../schema/post.js';

export const createPost = async (caption, image, user) => {
  try {
    const post = await Post.create({ caption, image, user });
    // const post = new Post({ caption, image, user });
    // await post.save();
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
// find post in paginated formated --- applying pagination in our api...
export const findAllPostPaginated = async (offset, limit) => {
  try {
    const post = await Post.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit).populate("user",'username email _id')
    return post;
  } catch (error) {
    console.log(error);
  }
};

// count total posts

export const countAllPosts = async () => {
  try {
    const count = await Post.countDocuments();
    return count;
  } catch (err) {
    console.log(err);
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

export const updatePost = async (id, postObj) => {
  try {
    const post = await Post.findByIdAndUpdate(id, postObj, { new: true });
    return post;
  } catch (err) {
    console.log(err);
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
