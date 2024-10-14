import User from '../schema/user';
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
