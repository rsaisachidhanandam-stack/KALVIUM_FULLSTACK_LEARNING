import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import postRoutes from './routes/post.routes.js';
import errorHandler from './middleware/error.middleware.js';

dotenv.config();

const app = express();

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/posts', postRoutes);

// global error handler (for assignment)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
