<template>
    <div class="reset-password-page">
      <div class="reset-password-form">
        <h2 class="title">Réinitialiser votre mot de passe</h2>
  
        <form @submit.prevent="handleResetPassword">
          <div class="form-group">
            <label for="newPassword">Nouveau mot de passe :</label>
            <input
              type="password"
              class="form-control"
              v-model="newPassword"
              placeholder="Entrez votre nouveau mot de passe"
              required
            />
          </div>
          
          <button type="submit" class="btn btn-reset">Réinitialiser le mot de passe</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const router = useRouter();
  
  const form = reactive({
    newPassword: '',
  });
  
  onMounted(() => {
    // Vérifier la présence du token dans l'URL
    const token = route.query.token;
    if (!token) {
      alert('Token de réinitialisation manquant.');
      router.push('/login');
    }
  });
  
  const handleResetPassword = async () => {
    const token = route.query.token;
    try {
      // Envoi du nouveau mot de passe à l'API pour réinitialiser
      await axios.post('http://localhost:4000/auth/reset-password', {
        token,
        nouveau_mot_de_passe: form.newPassword,
      });
  
      // Afficher un message de succès et rediriger
      alert('Mot de passe réinitialisé avec succès.');
      router.push('/login');
    } catch (error) {
      alert('Erreur lors de la réinitialisation du mot de passe : ' + error.response.data.message);
    }
  };
  </script>
  
  <style scoped>
  /* Ajouter un style pour votre formulaire de réinitialisation */
  .reset-password-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background: #f8f9fc;
  }
  
  .reset-password-form {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .title {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .btn-reset {
    background-color: #218838;
    color: white;
    border: none;
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }
  </style>
  