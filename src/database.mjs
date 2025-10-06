import mongoose from 'mongoose';
import envs from './envs/environments.mjs';

export const connectDB = async () => {
  try {
    const uri = `mongodb://${envs.NOTES_APP_MONGODB_HOST}/${envs.NOTES_APP_MONGODB_DATABASE}`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🟢 Connected to MongoDB');
  } catch (error) {
    console.error('🔴 MongoDB connection error:', error.message);
    throw error;
  }
};
