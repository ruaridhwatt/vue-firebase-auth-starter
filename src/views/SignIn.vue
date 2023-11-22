<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import router from '@/router';

const isLoading = ref(false);

const emailInput = ref(null);
const email = ref(null);
const isInvalidEmail = ref(false);

const passwordInput = ref(null);
const password = ref(null);
const isInvalidPassword = ref(false);

function signIn() {
  isLoading.value = true;
  isInvalidEmail.value = false;
  isInvalidPassword.value = false;
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      router.replace('/');
    })
    .catch((error) => {
      if (error.code === 'auth/wrong-password') {
        isInvalidPassword.value = true;
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
  <form class="container" v-on:submit.prevent="signIn">
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

      <label for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        v-model="password"
        :aria-invalid="isInvalidPassword ? true : null"
        ref="passwordInput"
      />
    </section>

    <section>
      <RouterLink to="/sign-up">Sign up?</RouterLink>
    </section>

    <button type="submit" :disabled="isLoading">Sign in</button>

    <section>
      <RouterLink to="/forgotten-password">Forgotten password?</RouterLink>
    </section>
  </form>
</template>

<style scoped></style>
