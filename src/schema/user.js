import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (emailValue) {
          return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
            emailValue
          );
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (passwordValue) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            passwordValue
          );
        },
        message:
          'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function modifyPassword(next) {
  // incoming user object
  const user = this; //object with plain password...

  const SALT = bcrypt.genSaltSync(9);

  const hashedPassword = bcrypt.hashSync(user.password, SALT);

  user.password = hashedPassword;

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
