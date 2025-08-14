import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false }
}, { _id: false });

const NoteSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled' },
  items: { type: [ItemSchema], default: [] },
  x: { type: Number, default: 80 },
  y: { type: Number, default: 80 },
  z: { type: Number, default: 1 },
  color: { type: String, default: '#FFF59D' },
  width: { type: Number, default: 260 },
  height: { type: Number, default: 220 }
}, { timestamps: true });

export default mongoose.model('Note', NoteSchema);