import {
  signinUserService,
  signupUserService,
} from '../services/userService.js';

export const signup = async (req, res) => {
  try {
    const user = await signupUserService(req.body);
    return res.status(201).json({
      success: true,
      message: 'User Created Successfully!!',
      data: user,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const response = await signinUserService(req.body);
    return res.status(200).json({
      success: true,
      message: 'User Signed in Successfully!!',
      data: response,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
