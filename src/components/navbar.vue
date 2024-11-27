<!-- <template>
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
</style> -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary-custom">
    <div class="container">
      <router-link to="/home" class="navbar-brand">
        <img src="../assets/logo.svg" alt="Logo" height="40" class="d-inline-block align-text-top" />
        Gestion de facturation
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
          <!-- Navigation Items -->
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
          <!-- Profil Section -->
          <li class="nav-item dropdown" v-if="isLoggedIn">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                v-if="user.profileImage"
                :src="user.profileImage"
                alt="Profile"
                class="rounded-circle profile-img"
              />
              <span v-else class="profile-initial">{{ getInitial(user.nom) }}</span>
              {{ user.nom || 'Profil' }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <router-link to="/profile" class="dropdown-item">Voir le profil</router-link>
              </li>
              <li>
                <router-link to="/changer-mot-de-passe" class="dropdown-item">Changer le mot de passe</router-link>
              </li>
              <li>
                <button class="dropdown-item" @click="logout">Déconnexion</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Vue Router instance
const router = useRouter();

// Reactive state for user data and login status
const user = reactive({
  nom: '',
  email: '',
  profileImage: '',
});

const isLoggedIn = ref(false);
const isAdmin = ref(false);

// Helper to extract initials from a name
const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');

// Logout function
const logout = () => {
  localStorage.removeItem('token');
  location.reload();
};

// Fetch user profile on component mount
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true;

    try {
      const response = await axios.get('http://localhost:4000/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.user) {
        user.nom = response.data.user.nom;
        user.email = response.data.user.email;
        user.profileImage = response.data.user.profileImage;
        isAdmin.value = response.data.user.role === 'ADMIN';
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    }
  }
});
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

.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.profile-initial {
  background-color: #f5f5f5;
  color: #218838;
  font-weight: bold;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
</style>
