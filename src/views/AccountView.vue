<script setup>
import { user } from '@/main';
import SaveInput from '@/components/SavableInput.vue';
import { ref } from 'vue';
import { updateEmail as updateFirebaseEmail, updatePassword, updateProfile } from 'firebase/auth';
import router from '@/router';

const displayName = ref(user.value.displayName);
const displayNameState = ref(null);

const email = ref(user.value.email);
const emailState = ref(null);

const password = ref(null);
const passwordState = ref(null);

function updateDisplayName(nextDisplayName) {
  updateFirebase(updateProfile, { displayName: nextDisplayName }, displayNameState);
}

function updateEmail(nextEmail) {
  updateFirebase(updateFirebaseEmail, nextEmail, emailState);
}

function changePassword(password) {
  updateFirebase(updatePassword, password, passwordState);
}

function updateFirebase(setter, payload, state) {
  state.value = 'saving';
  setter(user.value, payload)
    .then(() => {
      state.value = 'saved';
    })
    .catch((e) => {
      state.value = 'error';
      if (e.code === 'auth/requires-recent-login') {
        router.push('/reauthenticate');
      }
    });
}

function goToDeleteConfirmation() {
  router.push('confirm-delete-account');
}
</script>

<template>
  <main class="container">
    <SaveInput
      type="text"
      required
      min-length="2"
      max-length="30"
      id="display-name-input"
      label="Display name"
      v-model="displayName"
      @save="updateDisplayName($event)"
      :state="displayNameState"
    ></SaveInput>
    <SaveInput
      type="email"
      required
      id="email-input"
      label="Email"
      v-model="email"
      @save="updateEmail($event)"
      :state="emailState"
    ></SaveInput>
    <SaveInput
      type="password"
      min-length="6"
      required
      id="password-input"
      label="Update password"
      v-model="password"
      @save="changePassword($event)"
      :state="passwordState"
    ></SaveInput>

    <form class="delete-account-form" v-on:submit.prevent="goToDeleteConfirmation()">
      <button class="secondary" type="submit">Delete Account</button>
    </form>
  </main>
</template>

<style scoped>
.delete-account-form {
  margin-top: 4rem;
}
</style>
