import mongoose from 'mongoose';
import app from './app';
import config from './config';

const PORT = process.env.PORT || 5000;

// Connect to Database and Start Server
(async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
})();
