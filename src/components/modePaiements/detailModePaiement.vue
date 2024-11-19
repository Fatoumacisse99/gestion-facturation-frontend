<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center mb-3 p-3">
      <h2 class="title">Détails du Mode de Paiement</h2>
    </div>
    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else class="styled-form">
      <div class="mb-3">
        <label class="form-label">Libellé :</label>
        <p class="form-control-plaintext">{{ modePaiement.libelle }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">ID Utilisateur :</label>
        <p class="form-control-plaintext">{{ modePaiement.id_utilisateur }}</p>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button @click="retourListe" class="btn btn-secondary flex-grow-1">Retour</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useModePaiementStore } from "@/stores/modePaiementStore";

const modePaiementStore = useModePaiementStore();
const route = useRoute();
const router = useRouter();

const modePaiement = ref({
  libelle: "",
  id_utilisateur: ""
});
const loading = ref(true);
const error = ref("");

const loadModePaiement = async () => {
  try {
    const id = Number(route.params.id);
    const paymentMode = await modePaiementStore.getModePaiementById(id);
    if (paymentMode) {
      modePaiement.value = { ...paymentMode };
    } else {
      error.value = "Mode de paiement introuvable.";
    }
  } catch (err) {
    console.error("Erreur lors du chargement du mode de paiement :", err);
    error.value = "Erreur lors du chargement des détails. Veuillez réessayer.";
  } finally {
    loading.value = false;
  }
};

const retourListe = () => router.push("/modePaiements");

onMounted(loadModePaiement);
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
  font-size: 1rem;
  color: #555;
  padding: 0.4rem 0;
  border: none;
  background: none;
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
