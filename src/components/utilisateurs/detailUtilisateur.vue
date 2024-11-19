<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center mb-3 p-3">
      <h2 class="title">Détails de l'utilisateur</h2>
    </div>
    <div class="styled-form p-4">
      <div class="mb-3">
        <label class="form-label">Nom :</label>
        <p class="form-control-plaintext">{{ utilisateur.nom }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Email :</label>
        <p class="form-control-plaintext">{{ utilisateur.email }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Rôle :</label>
        <p class="form-control-plaintext">{{ utilisateur.role }}</p>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button @click="retourListe" class="btn btn-secondary flex-grow-1">Retour</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUtilisateurStore } from "@/stores/utilisateurStore";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const utilisateurStore = useUtilisateurStore();
const route = useRoute();
const router = useRouter();
const utilisateur = ref({ nom: "", email: "", role: "" });

const loadUtilisateur = async () => {
  try {
    const user = await utilisateurStore.getUtilisateurById(Number(route.params.id));
    utilisateur.value = { ...user };
  } catch (error) {
    console.error("Erreur lors du chargement de l'utilisateur :", error);
  }
};

const retourListe = () => {
  router.push("/utilisateurs");
};

onMounted(loadUtilisateur);
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.header {
  background-color: #f5f5dc;
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
}

.title {
  font-size: 1.4rem;
  color: #218838;
}

.styled-form {
  background: white;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-size: 0.9rem;
  color: #333;
}

.form-control-plaintext {
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  color: #333;
}

.btn-secondary {
  background-color: transparent;
  color: #218838;
  border: 1px solid #218838;
  font-weight: bold;
}

.btn-secondary:hover {
  background-color: #218838;
  color: white;
}
</style>
