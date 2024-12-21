import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET || 'defaultSecret', // Ensure this is defined in your .env file
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Ensure this is defined in your .env file
  },
};
