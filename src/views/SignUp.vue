<script setup>
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { ref } from 'vue';
import router from '@/router';

const isLoading = ref(false);

const displayName = ref(null);

const emailInput = ref(null);
const email = ref(null);
const isInvalidEmail = ref(false);

const passwordInput = ref(null);
const password = ref(null);
const isWeakPassword = ref(false);

function signUp() {
  isWeakPassword.value = false;
  isInvalidEmail.value = false;
  isLoading.value = true;
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, { displayName: displayName.value });
      router.replace('/');
    })
    .catch((error) => {
      if (error.code === 'auth/weak-password') {
        isWeakPassword.value = true;
        passwordInput.value.focus();
      } else {
        isInvalidEmail.value = true;
        emailInput.value.focus();
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <form class="container" v-on:submit.prevent="signUp()">
    <section>
      <label for="display-name">Display name</label>
      <input id="display-name" name="display-name" type="text" required v-model="displayName" />

      <label for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        v-model="email"
        :aria-invalid="isInvalidEmail ? true : null"
        ref="emailInput"
      />

      <label for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        v-model="password"
        minlength="6"
        :aria-invalid="isWeakPassword ? true : null"
        ref="passwordInput"
      />
    </section>

    <button type="submit" :disabled="isLoading">Create user</button>
  </form>
</template>

<style scoped></style>
