import app from './app';

const PORT = process.env.PORT || 5000;

// Connect to Database and Start Server
(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
})();
