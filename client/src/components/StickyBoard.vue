<template>
  <div class="board">
    <button @click="addNote">+ Add Note</button>
    <StickyNote
      v-for="note in notes"
      :key="note._id"
      :note="note"
      @update="saveNote"
      @delete="removeNote"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { getNotes, createNote, updateNote, deleteNote } from '../api.js';
  import StickyNote from './StickyNote.vue';

  const notes = ref([]);

  onMounted(async () => {
    notes.value = await getNotes();
  });

  async function addNote() {
    const newNote = await createNote({ title: 'New Note', items: [] });
    notes.value.push(newNote);
  }

  async function saveNote(note) {
    await updateNote(note._id, note);
  }

  async function removeNote(id) {
    await deleteNote(id);
    notes.value = notes.value.filter(n => n._id !== id);
  }
</script>

<style scoped>
  .board { 
    position: relative; 
    min-height: 100vh; 
    background: #f0f0f0; 
  }
</style>