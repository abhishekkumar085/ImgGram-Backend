

import {
  createComment,
  findCommentById,
} from '../repositories/commentRepository.js';
import { findPostById } from '../repositories/postRepository.js';

export const createCommentService = async (
  content,
  userId,
  onModel,
  commentableId
) => {
  try {
    let parent = await fetchCommentParent(onModel, commentableId);
    if (!parent) {
      throw {
        message: `${onModel} not found`,
        status: 404,
      };
    }

    const newComment = await createComment(
      content,
      userId,
      onModel,
      commentableId
    );

    await addChildCommentToParent(onModel, newComment, parent);

    return newComment;
  } catch (error) {
    console.log(error);
  }
};

export const findCommentByIdService = async (id) => {
  try {
    const comment = await findCommentById(id);
    if (!comment) {
      throw {
        message: 'Comment not found',
        status: 404,
      };
    }
    return comment;
  } catch (error) {
    console.log(error);
  }
};

const addChildCommentToParent = async (onModel, comment, parent) => {
  try {
    if (onModel === 'Post') {
      parent.comments.push(comment._id);
    } else if (onModel === 'Comment') {
      parent.replies.push(comment._id);
    }
    await parent.save();
  } catch (error) {
    console.log(error);
  }
};

const fetchCommentParent = async (onModel, commentableId) => {
  try {
    let parent;
    if (onModel === 'Post') {
      parent = await findPostById(commentableId);
    } else if (onModel === 'Comment') {
      parent = await findCommentById(commentableId);
    }
    return parent;
  } catch (error) {
    console.log(error);
  }
};

// export const createcommentService = async (
//   content,
//   userId,
//   onModel,
//   commentableId
// ) => {
//   try {
//     if (onModel === 'Post') {
//       // comment is being made on a post and commentableId is the post id

//       // 1.Check if post exists or not ?

//       const post = await findPostById(commentableId);

//       if (!post) {
//         throw {
//           message: 'Post not found!',
//           status: 404,
//         };
//       }
//       // 2.Create Comment
//       const newComment = await createComment(
//         content,
//         userId,
//         onModel,
//         commentableId
//       );

//       // 3. Add Comment to post

//       post.comments.push(newComment._id);

//       // save the post

//       await post.save();

//       return newComment;
//     } else if (onModel === 'Comment') {
//       const parentComment = await findCommentById(commentableId);
//       if (!parentComment) {
//         throw {
//           message: 'Comment not found!!',
//           status: 404,
//         };
//       }

//       const newComment = await createComment(
//         content,
//         userId,
//         onModel,
//         commentableId
//       );

//       parentComment.replies.push(newComment._id);

//       await parentComment.save();

//       return newComment;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };