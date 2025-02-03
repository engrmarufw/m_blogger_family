import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import UserModel from '../module/user/user.model';
import config from '../config';

// Middleware for authentication and authorization
const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is missing or malformed.',
      });
    }

    const token = authHeader.split(' ')[1];


    try {
      // Verify the token
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      const { role, email } = decoded;

      // Check if the user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found.',
        });
      }

      // Check if the user is blocked
      if (user.isBlocked) {
        return res.status(403).json({
          success: false,
          message: 'User is blocked. Contact support.',
        });
      }

      // Check if the user's role is authorized
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.',
        });
      }

      // Attach the decoded token to the request object
      req.user = decoded;

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.',
        error: error.message,
      });
    }
  });
};

export default auth;
