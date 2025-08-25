import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  userId: { type: String, default: '' },
  title: { type: String, default: 'Untitled' },
  content: { type: String, default: '' },
  x: { type: Number, default: 80 },
  y: { type: Number, default: 80 },
  z: { type: Number, default: 1 },
  color: { type: String, default: '#FFF59D' },
  width: { type: Number, default: 260 },
  height: { type: Number, default: 220 },
  editing: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Note', NoteSchema);