<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { getAuth, signOut as signOutFB } from 'firebase/auth';
import { user } from '@/main';
import router from '@/router';

function signOut() {
  signOutFB(getAuth()).then(() => {
    router.replace('/sign-in');
  });
}
</script>

<template>
  <header class="container">
    <nav>
      <ul>
        <li>
          <RouterLink to="/"><strong>Vue&nbsp;Firebase Auth&nbsp;Starter</strong></RouterLink>
        </li>
      </ul>
      <ul v-if="user">
        <li>
          <RouterLink to="/account">Account</RouterLink>
        </li>
        <li>
          <RouterLink to="" @click="signOut">Sign&nbsp;out</RouterLink>
        </li>
      </ul>

      <ul v-else>
        <li>
          <RouterLink to="/sign-in">Sign&nbsp;in</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<script></script>

<style scoped></style>
