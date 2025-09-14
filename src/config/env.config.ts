import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI:
    process.env.MONGO_URI || 'mongodb://localhost:27017/reservation-db',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
