# vue-firebase-auth-starter

This template should help get you started developing with Vue 3 and firebase.

The template is configured to use the composition API and the vue-router.
It also includes a basic login and registration form that uses firebase authentication.

[Pico.css](https://picocss.com/) has been used to give it some style without the need to dirty the templates too much.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Firebase Config
Create a firebase project and enable authentication.

Create a firebaseConfig.js file in the src directory and add your firebase config variables. It should look something like this:
```
export const firebaseConfig = {
    apiKey: "<removed>",
    authDomain: "<removed>",
    projectId: "<removed>",
    storageBucket: "<removed>",
    messagingSenderId: "<removed>",
    appId: "<removed>",
    measurementId: "<removed>"
};
```
