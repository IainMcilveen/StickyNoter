import { Router } from 'express';
import Note from '../models/Note.js';
import { clerkClient, requireAuth, getAuth } from '@clerk/express'

const router = Router();

router.get('/', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  const notes = await Note.find({ userId: userId }).sort({ updatedAt: -1 });
  res.json(notes);
});

router.post('/', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)

  const newNote = req.body;
  newNote['userId'] = userId;

  const note = await Note.create(newNote);
  res.status(201).json(note);
});

router.post('/newEdit/:id?', requireAuth(), async (req, res) => {
  let id = "";
  if(req.params.id && req.params.id !== "") {
    id = req.params.id;
  }

  await Note.updateMany(
    {},
    { "$set": {
      "editing": false
    }},
  )

  if (id !== undefined && id !== "") {
    await Note.updateOne(
      {_id:id},
      { "$set": {
        "editing": true
      }},
    )
  }
  
  const { userId } = getAuth(req)
  const notes = await Note.find({ userId: userId }).sort({ updatedAt: -1 });
  res.json(notes);
})

router.put('/:id', requireAuth(), async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

router.delete('/:id', requireAuth(), async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;