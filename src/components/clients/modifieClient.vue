<template>
    <div class="container mt-4">
      <div class="header d-flex align-items-center mb-3 p-3">
        <h2 class="title">Modifier le client</h2>
      </div>
      <form @submit.prevent="modifierClient" class="styled-form">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Nom:</label>
            <input v-model="client.nom" required class="form-control form-control-sm" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Prénom:</label>
            <input v-model="client.prenom" required class="form-control form-control-sm" />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input v-model="client.email" required type="email" class="form-control form-control-sm" />
        </div>
        <div class="mb-3">
          <label class="form-label">Téléphone:</label>
          <input v-model="client.telephone" required class="form-control form-control-sm" />
        </div>
        <div class="mb-3">
          <label class="form-label">Adresse:</label>
          <input v-model="client.adresse" required class="form-control form-control-sm" />
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button type="submit" class="btn btn-primary flex-grow-1 me-2">Enregistrer</button>
          <button type="button" @click="annuler" class="btn btn-cancel flex-grow-1">Annuler</button>
        </div>
      </form>
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
  
  const modifierClient = async () => {
    try {
      await clientStore.updateClient(client.value);
      router.push("/clients");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client :", error);
    }
  };
  
  const annuler = () => {
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
  