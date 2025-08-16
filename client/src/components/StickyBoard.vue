<template>
  <div class="board" @click="(_) => { clearAllHovers() }">
    {{ notes }}
    <button @click="addNote">+ Add Note</button>
    <StickyNote
      v-for="note in notes"
      :key="note._id"
      :note="note"
      @update="saveNote"
      @delete="removeNote"
      @clearHovers="clearAllHovers"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { getNotes, createNote, updateNote, deleteNote, clearHovers } from '../api.js';
  import StickyNote from './StickyNote.vue';

  const notes = ref([]);

  onMounted(async () => {
    notes.value = await getNotes();
  });

  const addNote = async () => {
    const newNote = await createNote({ title: 'New Note', items: [] });
    notes.value.push(newNote);
  }

  const saveNote = async (note) => {
    await updateNote(note._id, note);
  }

  const removeNote = async (id) => {
    await deleteNote(id);
    notes.value = notes.value.filter(n => n._id !== id);
  }

  const clearAllHovers = async (id) => {
    notes.value = await clearHovers();
    if (id != undefined) {
      console.log("fuck you")
      notes.value.find(x => x._id === id).hovering = true;
    }
  }
</script>

<style scoped>
  .board { 
    position: relative; 
    min-height: 100vh; 
    background: #f0f0f0; 
  }
</style>