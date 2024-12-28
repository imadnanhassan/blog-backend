import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';

const PORT = process.env.PORT || 5000;

let server: Server;
// Connect to Database and Start Server
(async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');

    // seedAdmin();
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
})();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
