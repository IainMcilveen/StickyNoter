<template>
  <SignedIn>
    <TopBar @addNote="addNote" />
    <div class="board" @click="(_) => { handleNewEdit() }">
      <StickyNote
        v-for="note in notes"
        :key="note._id + (!note.editing ? redraw.toString() : '')"
        :note="note"
        @update="saveNote"
        @delete="removeNote"
        @newEdit="handleNewEdit"
      />
    </div>
  </SignedIn>
  <SignedOut>
    <div class="w-screen h-screen flex">
      <SignInButton class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-auto" />
    </div>
  </SignedOut>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { getNotes, createNote, updateNote, deleteNote, newEdit } from '../api.js';
  import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
  import StickyNote from './StickyNote.vue';
  import TopBar from './TopBar.vue';
  
  const notes = ref([]);
  const redraw = ref(0)

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

  const handleNewEdit = async (id) => {
    notes.value = await newEdit(id);
    redraw.value += 1;
  }
</script>

<style scoped>
  .board { 
    position: relative; 
    min-height: 100vh; 
    background: #f0f0f0; 
  }
</style>