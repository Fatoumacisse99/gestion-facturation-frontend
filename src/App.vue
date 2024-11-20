<template>
  <div id="app">
    <!-- Afficher le Navbar uniquement si la route n'est pas dans les exclusions -->
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    showNavbar() {
      // Liste des routes où le navbar ne doit pas être affiché
      const noNavbarRoutes = ['/login', '/forgot-password', '/reset-password'];
      return !noNavbarRoutes.includes(this.$route.path);
    },
  },
};
</script>

<style>
</style>
