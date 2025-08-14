<template>
  <div
    class="note"
    :style="{ left: note.x + 'px', top: note.y + 'px', background: note.color }"
    @mousedown="startDrag"
  >
    <input v-model="note.title" @change="emitUpdate" />
    <ul>
      <li v-for="(item, index) in note.items" :key="index">
        <input v-model="item.text" @change="emitUpdate" />
        <button @click="removeItem(index)">x</button>
      </li>
    </ul>
    <button @click="addItem">+ Item</button>
    <button @click="$emit('delete', note._id)">Delete</button>
  </div>
</template>

<script setup>
  import { reactive, toRefs } from 'vue';

  const props = defineProps({ note: Object });
  const emit = defineEmits(['update', 'delete']);
  const note = reactive(props.note);

  function emitUpdate() { emit('update', note); }
  function addItem() { note.items.push({ text: '' }); emitUpdate(); }
  function removeItem(i) { note.items.splice(i, 1); emitUpdate(); }

  let offsetX, offsetY;
  function startDrag(e) {
    offsetX = e.clientX - note.x;
    offsetY = e.clientY - note.y;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  }
  function onDrag(e) {
    note.x = e.clientX - offsetX;
    note.y = e.clientY - offsetY;
    emitUpdate();
  }
  function stopDrag() {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }
</script>

<style>
  .note {
    position: absolute;
    padding: 10px;
    width: 260px;
    background: #fff59d;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  }
</style>