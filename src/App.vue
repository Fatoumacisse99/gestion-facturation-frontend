<template>
  <div id="app">
    <!-- Afficher le Navbar uniquement si la route n'est pas dans les exclusions -->
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Navbar from './components/Navbar.vue';


export default {
  name: 'App',
  components: {
    Navbar,
    Home,
  },
  computed: {
    showNavbar() {
      const noNavbarRoutes = ['/login', '/forgot-password', '/reset-password'];
      return !noNavbarRoutes.includes(this.$route.path);
    },
  },
};
</script>

<style>
</style>
