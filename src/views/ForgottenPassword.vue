<script setup>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ref } from 'vue';

const emailInput = ref(null);
const email = ref(null);
const isInvalidEmail = ref(false);
const isEmailSent = ref(false);

function reset() {
  isInvalidEmail.value = false;
  const auth = getAuth();
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      isEmailSent.value = true;
    })
    .catch(() => {
      isInvalidEmail.value = true;
      emailInput.value.focus();
    });
}
</script>

<template>
  <form class="container" v-on:submit.prevent="reset">
    <section>
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
    </section>

    <button type="submit" :disabled="isEmailSent">Reset password</button>
    <small v-if="isEmailSent">Password reset email sent!</small>
  </form>
</template>

<style scoped></style>
