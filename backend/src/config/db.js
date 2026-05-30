import mongoose from 'mongoose';

export const connectDB = async (mongoUri, options = {}) => {
  mongoose.set('strictQuery', true);

  const connection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: options.serverSelectionTimeoutMs
  });
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

export const disconnectDB = async () => {
  await mongoose.connection.close(false);
};
