import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register({
    ...req.body,
    isBlocked: false,
    role: 'user',
  });

  const sanitizedResult = result.toObject
    ? {
        ...result.toObject(),
        password: undefined,
        isBlocked: undefined,
        role: undefined,
      }
    : { ...result, password: undefined, isBlocked: undefined, role: undefined };

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: sanitizedResult,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully',
    data: {
      token: result?.token,
    },
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'User is not logged in',
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User logged out successfully',
    data: {},
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.refreshToken(req.body?.refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Token refreshed successfully',
    data: {
      token: result,
    },
  });
});

export const AuthControllers = {
  register,
  login,
  logout,
  refreshToken,
};
