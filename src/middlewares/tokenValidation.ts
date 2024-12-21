import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'defaultSecret'; // Replace with your actual secret key
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = decoded; // Attach decoded token payload to the request object
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
