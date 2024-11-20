<template>
  <div class="reset-password-page">
    <div class="reset-password-card">
      <h2 class="title">Réinitialisation du mot de passe</h2>
      <p class="description">
        Entrez un nouveau mot de passe sécurisé.
      </p>
      <form @submit.prevent="handleResetPassword">
        <div class="form-group">
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            v-model="newPassword"
            class="form-control"
            placeholder="Entrez votre nouveau mot de passe"
            required
          />
        </div>
        <button type="submit" class="btn btn-reset">Réinitialiser</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const newPassword = ref('');
const token = ref('');

onMounted(() => {
  token.value = route.query.token;

  if (!token.value) {
    alert('Token de réinitialisation manquant.');
    router.push('/login');
  }
});

const handleResetPassword = async () => {
  try {
    await axios.post('http://localhost:4000/auth/reset-password', {
      token: token.value,
      nouveau_mot_de_passe: newPassword.value,
    });

    alert('Votre mot de passe a été réinitialisé avec succès.');
    router.push('/login');
  } catch (error) {
    alert('Erreur lors de la réinitialisation du mot de passe : ' + (error.response?.data?.message || 'Une erreur est survenue.'));
  }
};
</script>

<style scoped>
.reset-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
}

.reset-password-card {
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

.btn-reset {
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

.btn-reset:hover {
  background: #218838;
}
</style>
