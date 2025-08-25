import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import notesRouter from './routes/notes.js';
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));
app.use(clerkMiddleware())

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/notes', notesRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`API listening on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });