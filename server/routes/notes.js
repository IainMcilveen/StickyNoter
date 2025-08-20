import { Router } from 'express';
import Note from '../models/Note.js';

const router = Router();

router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ updatedAt: -1 });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
});

router.post('/newEdit/:id?', async (req, res) => {
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
  
  const notes = await Note.find().sort({ updatedAt: -1 });
  res.json(notes);
})

router.put('/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;