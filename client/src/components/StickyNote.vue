<template>
  <div
    class="note"
    :style="{ left: note.x + 'px', top: note.y + 'px', background: note.color }"
    @mousedown="startDrag"
    @click.stop
  >
    <div v-if="note.editing" class="ql-editor">
      <input v-model="note.title" @change="emitUpdate" />
      <QuillEditor
        v-model:content="note.content"
        content-type="html"
        theme="snow"
        @blur="emitUpdate"
      />
    </div>
    <div v-else>
      <div class="title-row flex mb-1">
        <div class="text-l font-bold">{{ note.title }}</div>
        <div class="ml-auto" @mousedown.stop @click.stop="emitDelete(note._id)">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </div>
      </div>
      <div v-html="note.content" class="list-disc"></div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  const props = defineProps({ note: Object });
  const emit = defineEmits(['update', 'delete', 'newEdit']);
  const note = reactive(props.note);

  const emitUpdate = () => { emit('update', note); }
  const emitDelete = (id) => { emit('delete', id) }
  const emitNewEdit = (id) => { emit('newEdit', id) }

  let offsetX, offsetY;
  const startDrag = (e) => {
    emitNewEdit(note._id)

    offsetX = e.clientX - note.x;
    offsetY = e.clientY - note.y;
    note.z = Date.now();
    note.editing = true;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  }
  const onDrag = (e) => {
    note.x = e.clientX - offsetX;
    note.y = e.clientY - offsetY;
  }
  const stopDrag = () => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    emitUpdate();
  }

</script>

<style>
  .note {
    position: absolute;
    background: #fff475;
    padding: 1rem;
    width: 350px;
    min-height: 150px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    border: 1px solid #e0e0a0;
    border-radius: 4px;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    transform: rotate(-1deg);
    cursor: grab;
  }
  .note:active {
    cursor: grabbing;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem; 
  }

  ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
</style>