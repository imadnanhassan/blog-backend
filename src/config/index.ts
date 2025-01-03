import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  secret_key: process.env.SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRATION,
  NODE_ENV: process.env.NODE_ENV,
  admin_password: process.env.ADMIN_PASSWORD,
};
