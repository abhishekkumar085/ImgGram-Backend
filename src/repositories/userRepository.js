import User from '../schema/user.js';
export const findUserByEmail = async (email) => {
  try {
    const user = await User.find({ email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const findAllUser = async () => {
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw error;
    console.log(error);
  }
};
