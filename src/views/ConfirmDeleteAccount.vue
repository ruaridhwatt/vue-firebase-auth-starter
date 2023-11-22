<script setup>
import router from '@/router';
import { user } from '@/main';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { ref } from 'vue';

const isLoading = ref(false);

const passwordInput = ref(null);
const password = ref(null);
const isInvalidPassword = ref(false);

function cancel() {
  router.back();
}

function deleteAccount() {
  isLoading.value = true;
  isInvalidPassword.value = false;

  const credential = EmailAuthProvider.credential(user.value.email, password.value);
  reauthenticateWithCredential(user.value, credential)
    .then(() => {
      deleteUser(user.value)
        .then(() => {
          router.replace('/');
        })
        .catch(() => {
          isInvalidPassword.value = true;
          passwordInput.value.focus();
          isLoading.value = false;
        });
    })
    .catch(() => {
      isInvalidPassword.value = true;
      passwordInput.value.focus();
      isLoading.value = false;
    });
}
</script>

<template>
  <main class="container">
    <h3>Delete Account</h3>

    <form v-on:submit.prevent="deleteAccount()">
      <p>Are you sure you want to delete your account?</p>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        required
        v-model="password"
        :aria-invalid="isInvalidPassword ? true : null"
        ref="passwordInput"
      />

      <button type="submit">Delete my account</button>
    </form>
    <button class="secondary" @click="cancel()">Cancel</button>
  </main>
</template>

<style scoped></style>
