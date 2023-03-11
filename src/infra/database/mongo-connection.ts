import mongoose from 'mongoose';

const MONGO_DB_URL = 'mongodb://localhost:27017/';

export async function connectToDatabase(
  mongoDatabaseURI = process.env.MONGODB_URL || MONGO_DB_URL
) {
  try {
    const connection = await mongoose.connect(mongoDatabaseURI);
    console.log('DB connected!');
    return connection;
  } catch (e) {
    console.log(e);
    throw new Error('DB not connected!');
  }
}
