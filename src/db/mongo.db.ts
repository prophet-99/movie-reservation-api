import mongoose from 'mongoose';
import { ENV } from '../config/env.config';

export const connectMongo = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(ENV.MONGO_URI);

  console.log('[🍃 MONGO] Connected');
};
