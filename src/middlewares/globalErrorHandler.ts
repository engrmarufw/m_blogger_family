import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleCastError } from '../helpers/handleCastError';
import { handlerDuplicateError } from '../helpers/handleDuplicateError';
import { handleGenericError } from '../helpers/handleGenericError';
import { handlerZodError } from '../helpers/handleZodError';
import { handleValidationError } from '../helpers/handlerValidationError';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
): void => {
  if (err.name === 'ZodError') {
    handlerZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err instanceof mongoose.Error) {
    handlerDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  } else {
    res.status(500).json({
      status: false,
      message: 'Unexpected error occurred',
    });
  }
};
