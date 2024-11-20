<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary-custom">
    <div class="container">
      <router-link to="/home" class="navbar-brand">
        <img src="../assets/logo.svg" alt="Logo" height="40" class="d-inline-block align-text-top" />Gestion de facturation
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          
          <li class="nav-item" v-if="isAdmin">
            <router-link to="/utilisateurs" class="nav-link">
              <i class="fas fa-users"></i> Utilisateurs
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/clients" class="nav-link">
              <i class="fas fa-address-book"></i> Clients
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/factures" class="nav-link">
              <i class="fas fa-file-invoice"></i> Factures
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/paiements" class="nav-link">
              <i class="fas fa-credit-card"></i> Paiements
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/modePaiements" class="nav-link">
              <i class="fas fa-wallet"></i> Methode-Paiements
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/profile" class="nav-link">
              <i class="fas fa-user"></i> Profil
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isAdmin() {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); 
        return decodedToken && decodedToken.role === 'ADMIN';  
      }
      return false;
    },
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  }
}
</script>

<style scoped>
.bg-primary-custom {
  background-color: #218838;
}

.navbar-brand {
  font-weight: bold;
  display: flex;
  align-items: center;
  color: white !important;
}

.navbar-brand img {
  margin-right: 10px;
}

.nav-link {
  color: white !important;
}

.nav-link:hover {
  color: #e6a313 !important;
}

.navbar-toggler-icon {
  filter: brightness(0) invert(1);
}
</style>
