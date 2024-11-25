import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 1,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Post', 'Comment'],
  },
  commentableId: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: 'onModel',
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Like"
    }
  ]
});

const Comment = mongoose.model('Model', commentSchema);

export default Comment;
