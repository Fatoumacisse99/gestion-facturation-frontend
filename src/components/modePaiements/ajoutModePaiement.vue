<template>
    <div class="container mt-4">
      <div class="header d-flex justify-content-between align-items-center mb-3 p-3">
        <h2 class="title">Ajouter un Mode de Paiement</h2>
      </div>
      <form @submit.prevent="ajouterModePaiement" class="compact-form">
        <div class="mb-3">
          <label class="form-label">Libellé:</label>
          <input v-model="libelle" type="text" required class="form-control form-control-sm" placeholder="Nom du mode de paiement" />
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary flex-grow-1 me-2">Enregistrer</button>
          <button type="button" @click="annuler" class="btn btn-cancel flex-grow-1">Annuler</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useModePaiementStore } from "@/stores/modePaiementStore";
  
  const router = useRouter();
  const modePaiementStore = useModePaiementStore();
  const libelle = ref("");
  
  const ajouterModePaiement = async () => {
    try {
      await modePaiementStore.addModePaiement({ libelle: libelle.value});
      router.push("/modePaiements");
    } catch (error) {
      console.error("Erreur lors de l'ajout du mode de paiement :", error);
    }
  };
  
  const annuler = () => {
    router.push("/modePaiements");
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
  }
  
  .header {
    background-color: #f5f5dc; /* Beige */
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .title {
    font-size: 1.2rem;
    margin: 0;
    color: #218838;
  }
  
  .compact-form {
    background: #fff;
    border: 1px solid #ddd;
    padding: 1.5rem;
    border-radius: 8px;
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
  