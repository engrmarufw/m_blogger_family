import { User } from '../user/user.interface';
import UserModel from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const register = async (payload: User) => {
  const result = await UserModel.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  // Check if the user exists
  const user = await UserModel.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error(
      'User not found. Please register or check your credentials.',
    );
  }

  // Check if the user is inactive
  if (user.isBlocked) {
    throw new Error('This user is blocked. Please contact support.');
  }

  // Check if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid password. Please try again.');
  }

  // Create JWT token
  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  return { token, user };
};

const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw new Error('User not found.');
    }

    const newToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    );

    return { token: newToken, user };
  } catch (error) {
    throw new Error('Invalid or expired token. Please login again.');
  }
};

const logout = async () => {
  // Placeholder for logout logic (e.g., token blacklisting if implemented)
  return { message: 'User logged out successfully.' };
};

export const AuthService = {
  register,
  login,
  refreshToken,
  logout,
};
