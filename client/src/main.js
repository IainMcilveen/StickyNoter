import { createApp } from 'vue';
import App from './App.vue';

// imports tailwind styles
import './styles.css'

// imports quillEditor and its theme 
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTrash } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTrash)

createApp(App)
  .component('QuillEditor', QuillEditor)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');