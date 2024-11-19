<template>
  <div class="auth-page">
    <div class="background-box"></div>
    <div class="auth-form">
      <h2 class="title">Page de <span class="highlight">Connexion</span></h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Email :</label>
          <input 
            type="email" 
            class="form-control" 
            v-model="form.email"
            placeholder="Enter votre email"
            required
          >
        </div>

        <div class="form-group">
          <label>Mot de passe :</label>
          <input 
            type="password" 
            class="form-control"
            v-model="form.password"
            placeholder="Enter votre mot de passe"
            required
          >
          <div class="forgot-password-wrapper">
            <router-link to="/forgot-password" class="forgot-password">Mot de passe oublié?</router-link>
          </div>
        </div>

        <button type="submit" class="btn btn-login">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Assurez-vous d'avoir installé axios

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    // Appel API pour la connexion
    const response = await axios.post('http://localhost:4000/auth/login', {
      email: form.email,
      mot_de_passe: form.password,
    });

    // Si la connexion est réussie, enregistrer le token
    localStorage.setItem('token', response.data.token);

    // Rediriger vers la page d'accueil ou tableau de bord
    router.push('/home');
  } catch (error) {
    // Gérer les erreurs d'authentification
    console.error(error.response ? error.response.data : error.message);
    alert('Erreur de connexion, veuillez vérifier vos informations.');
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fc;
  position: relative;
  padding: 20px;
}

.background-box {
  position: absolute;
  width: 480px;
  height: 490px;
  background: #218838; 
  border-radius: 20px;
  transform: rotate(-6deg) translateY(-20px); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 0;
}

.auth-form {
  background: white;
  border-radius: 20px;
  padding: 60px; 
  max-width: 470px;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1;
  position: relative;
}

.title {
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
}

.highlight {
  color: #1e7e34;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-control:focus {
  border-color: #218838;
  box-shadow: none;
}

.forgot-password-wrapper {
  text-align: right;
  margin-top: 5px;
}

.forgot-password {
  color: #218838;
  font-size: 0.9rem;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.form-check {
  margin: 20px 0;
  text-align: left;
}

.btn-login {
  background-color: #218838;
  color: white;
  border: none;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

.btn-login:hover {
  background-color: #1e7e34;
}
</style>
