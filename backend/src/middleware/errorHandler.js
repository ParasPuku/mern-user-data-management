import { env } from '../config/env.js';

const buildValidationErrors = (error) =>
  Object.values(error.errors).map((validationError) => ({
    field: validationError.path,
    message: validationError.message
  }));

export const notFound = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';
  let details;

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    details = buildValidationErrors(error);
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource id';
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = 'A user with this email already exists';
  }

  const response = {
    message
  };

  if (details) {
    response.details = details;
  }

  if (env.nodeEnv !== 'production') {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

