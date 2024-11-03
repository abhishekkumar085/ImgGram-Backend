import { checkIfUserExists } from '../services/userService.js';
import { verifyJWT } from '../utils/jwt.js';

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Token is required!',
    });
  }
  try {
    const response = verifyJWT(token);
    req.user = response;
    const doesUserExists = await checkIfUserExists(response.email);
    if (!doesUserExists) {
      return res.status(404).json({
        success: false,
        message: 'user not found!!',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: 'Invalid token!',
    });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!',
    });
  }
  next();
};
