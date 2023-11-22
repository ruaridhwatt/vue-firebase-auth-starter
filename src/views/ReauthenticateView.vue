<script setup>
import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { ref } from 'vue';
import router from '@/router';

const passwordInput = ref(null);
const password = ref(null);
const failed = ref(false);

function reauthenticate() {
  const auth = getAuth();
  const credential = EmailAuthProvider.credential(auth.currentUser.email, password.value);
  reauthenticateWithCredential(auth.currentUser, credential)
    .then(() => {
      router.back();
    })
    .catch(() => {
      failed.value = true;
      passwordInput.value.focus();
    });
}
</script>

<template>
  <main class="container">
    <h3>Reauthenticate</h3>
    <form class="container" v-on:submit.prevent="reauthenticate()">
      <label for="password">Password</label>
      <input
        ref="passwordInput"
        id="password"
        name="password"
        type="password"
        required
        v-model="password"
        :aria-invalid="failed ? true : null"
      />
      <button type="submit">Reauthenticate</button>
    </form>
  </main>
</template>

<style scoped></style>
