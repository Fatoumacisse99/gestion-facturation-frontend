<template>
  <div id="app">
    <!-- Only show the Navbar if the route is not /login -->
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
    // Only show the navbar if the current route is not /login
    showNavbar() {
      return this.$route.path !== '/login';
    },
  },
};
</script>

<style>
/* Global styles if needed */
</style>
