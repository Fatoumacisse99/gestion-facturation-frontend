<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center mb-3 p-3">
      <h2 class="title">Détails du client</h2>
    </div>
    <div class="styled-form p-4">
      <div class="mb-3">
        <label class="form-label">Nom :</label>
        <p class="form-control-plaintext">{{ client.nom }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Prénom :</label>
        <p class="form-control-plaintext">{{ client.prenom }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Email :</label>
        <p class="form-control-plaintext">{{ client.email }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Téléphone :</label>
        <p class="form-control-plaintext">{{ client.telephone }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Adresse :</label>
        <p class="form-control-plaintext">{{ client.adresse }}</p>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button @click="retourListe" class="btn btn-secondary flex-grow-1">Retour</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClientStore } from "@/stores/clientStore";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const clientStore = useClientStore();
const route = useRoute();
const router = useRouter();
const client = ref({ nom: "", prenom: "", email: "", telephone: "", adresse: "" });

const loadClient = async () => {
  try {
    const fetchedClient = await clientStore.getClientById(Number(route.params.id));
    client.value = { ...fetchedClient };
  } catch (error) {
    console.error("Erreur lors du chargement du client :", error);
  }
};

const retourListe = () => {
  router.push("/clients");
};

onMounted(loadClient);
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
