import mongoose from 'mongoose';
import { DB_URL } from './serverConfig.js';

export default async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log('Database Connected Successfully!!');
  } catch (err) {
    console.log('Something went wrong!!', err);
  }
}
