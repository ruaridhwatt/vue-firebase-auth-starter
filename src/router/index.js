import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { user } from '@/main';

function requireLogIn() {
  return user.value ? true : { name: 'sign in' };
}

function requireNotLoggedIn() {
  return user.value ? { name: 'home' } : true;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sign-in',
      name: 'sign in',
      component: () => import('../views/SignIn.vue'),
      beforeEnter: requireNotLoggedIn,
    },
    {
      path: '/sign-up',
      name: 'sign up',
      component: () => import('../views/SignUp.vue'),
      beforeEnter: requireNotLoggedIn,
    },
    {
      path: '/forgotten-password',
      name: 'forgotten password',
      component: () => import('../views/ForgottenPassword.vue'),
      beforeEnter: requireNotLoggedIn,
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      beforeEnter: requireLogIn,
    },
    {
      path: '/confirm-delete-account',
      name: 'confirm delete account',
      component: () => import('../views/ConfirmDeleteAccount.vue'),
      beforeEnter: requireLogIn,
    },
    {
      path: '/reauthenticate',
      name: 'reauthenticate',
      component: () => import('../views/ReauthenticateView.vue'),
      beforeEnter: requireLogIn,
    },
  ],
});

export default router;
