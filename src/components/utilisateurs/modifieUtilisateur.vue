<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center mb-3 p-3">
      <h2 class="title">Modifier l'utilisateur</h2>
    </div>
    <form @submit.prevent="modifierUtilisateur" class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nom:</label>
          <input v-model="utilisateur.nom" required class="form-control form-control-sm" />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Email:</label>
          <input v-model="utilisateur.email" required type="email" class="form-control form-control-sm" />
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-md-6 mb-3">
          <label class="form-label">Mot de passe:</label>
          <input v-model="utilisateur.mot_de_passe" type="password" class="form-control form-control-sm" placeholder="Laissez vide pour ne pas modifier" />
        </div> -->
        <div class="col-md-6 mb-3">
          <label class="form-label">Rôle:</label>
          <select v-model="utilisateur.role" required class="form-control form-control-sm">
            <option value="ADMIN">ADMIN</option>
            <option value="COMPTABLE">COMPTABLE</option>
          </select>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Statut:</label>
          <select v-model="utilisateur.statut" required class="form-control form-control-sm">
            <option :value="true">Actif</option>
            <option :value="false">Inactif</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">Enregistrer</button>
        <button type="button" @click="annuler" class="btn btn-cancel flex-grow-1">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useUtilisateurStore } from "@/stores/utilisateurStore";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const utilisateurStore = useUtilisateurStore();
const route = useRoute();
const router = useRouter();
const utilisateur = ref({ nom: "", email: "", role: "COMPTABLE"});

const loadUtilisateur = async () => {
  try {
    const user = await utilisateurStore.getUtilisateurById(Number(route.params.id));
    utilisateur.value = { ...user };
  } catch (error) {
    console.error("Erreur lors du chargement de l'utilisateur :", error);
  }
};

const modifierUtilisateur = async () => {
  try {
    await utilisateurStore.updateUtilisateur(utilisateur.value);
    router.push("/utilisateurs");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
  }
};

const annuler = () => {
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

.form-control-sm {
  border-radius: 5px;
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
}

.btn-primary {
  background-color: #218838;
  border-color: #218838;
  color: white;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #1e7e34;
  border-color: #1e7e34;
}

.btn-cancel {
  background-color: transparent;
  color: #218838;
  border: 1px solid #218838;
  font-weight: bold;
}

.btn-cancel:hover {
  background-color: #218838;
  color: white;
}
</style>
