import mongoose from 'mongoose';

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
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model('User', userSchema);

export default user;
