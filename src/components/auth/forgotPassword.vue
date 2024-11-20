<template>
    <div class="forgot-password-page">
      <div class="forgot-password-card">
        <h2 class="title">Mot de passe oublié</h2>
        <p class="description">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
        <form @submit.prevent="handleForgotPassword">
          <div class="form-group">
            <label>Email :</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <button type="submit" class="btn btn-forgot">Envoyer le lien</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  
  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:4000/auth/request-password-reset', { email: email.value });
      alert('Un lien de réinitialisation a été envoyé à votre adresse email.');
    } catch (error) {
      alert('Erreur : ' + (error.response?.data?.message || 'Une erreur est survenue.'));
    }
  };
  </script>
  
  <style scoped>
  .forgot-password-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f4f4f4; /* Couleur douce et neutre */
  }
  
  .forgot-password-card {
    background: #ffffff;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 20px #218838;
    text-align: center;
    width: 100%;
    max-width: 400px;
  }
  
  .title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #218838;
    margin-bottom: 20px;
  }
  
  .description {
    font-size: 0.9rem;
    color: #218838;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-control {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }
  
  .form-control:focus {
    border-color: #218838;
    box-shadow: 0 0 5px #218838;
    outline: none;
  }
  
  .btn-forgot {
    background: #218838;
    color: white;
    font-size: 1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
  }
  
  .btn-forgot:hover {
    background: #218838;
  }
  </style>
  