import app from './server.mjs';
import { connectDB } from './database.mjs';

const startServer = async () => {
  try {
    await connectDB();

    const port = app.get('port');
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error.message);
    process.exit(1);
  }
};

startServer();
