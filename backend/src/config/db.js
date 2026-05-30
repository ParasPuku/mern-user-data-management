import mongoose from 'mongoose';

import { Account } from '../models/Account.js';
import { OtpToken } from '../models/OtpToken.js';
import { User } from '../models/User.js';

export const connectDB = async (mongoUri, options = {}) => {
  mongoose.set('strictQuery', true);

  const connection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: options.serverSelectionTimeoutMs
  });
  console.log(`MongoDB connected: ${connection.connection.host}`);

  if (options.syncIndexes) {
    await Promise.all([
      Account.syncIndexes(),
      OtpToken.syncIndexes(),
      User.syncIndexes()
    ]);
    console.log('MongoDB indexes synchronized');
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close(false);
};
