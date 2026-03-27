import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './src/routes/authRoutes.js';
import protectedRoutes from './src/routes/protectedRoutes.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'KindKart API is running 🚀' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
