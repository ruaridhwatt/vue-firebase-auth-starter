import '@picocss/pico';
import './assets/style.css';

import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebaseConfig';

let vueApp = null;
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export const user = ref(null);

onAuthStateChanged(auth, (u) => {
  user.value = u;

  if (!vueApp) {
    vueApp = createApp(App);
    vueApp.use(router);
    vueApp.mount('body');
  }
});
