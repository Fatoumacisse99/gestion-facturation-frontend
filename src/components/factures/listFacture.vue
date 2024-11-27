<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3 p-3 header">
      <h2 class="title">Liste des Factures</h2>
      <router-link to="/factures/ajout" class="btn btn-add">Ajouter</router-link>
    </div>

    <div class="mb-3 d-flex justify-content-end">
      <input type="text" class="form-control search-input" placeholder="Rechercher par client ou montant" v-model="searchQuery" />
    </div>

    <table class="table table-bordered">
      <thead class="table-light border-top">
        <tr>
          <th>N°Facture</th>
          <th>Date d'Émission</th>
          <th>Date d'Échéance</th>
          <th>Client</th>
          <th>Montant</th>
          <th>Pourcentage de Paiement</th>
          <th>Montant Restant</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="facture in filteredFactures" :key="facture.id">
          <td>FT{{ facture.id }}</td>
          <td>{{ formatDate(facture.date_emission) }}</td>
          <td>{{ formatDate(facture.date_echeance) }}</td>
          <td>{{ facture.client ? `${facture.client.nom} ${facture.client.prenom}` : "Client inconnu" }}</td>
          <td>{{ facture.montant }} MRU</td>
          <td>{{ facture.pourcentage_paiement }}%</td>
          <td>{{ calculateMontantRestant(facture) }} MRU</td> 
          <td class="text-center">
            <router-link :to="{ name: 'DetailFacture', params: { id: facture.id } }" class="action-icon">
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link :to="{ name: 'ModifieFacture', params: { id: facture.id } }" class="action-icon">
              <i class="fas fa-edit"></i>
            </router-link>
            <button v-if="factureStore.userRole !== 'ADMIN'" @click="supprimerFacture(facture.id)" class="action-icon btn-delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useFactureStore } from "@/stores/factureStore";
import Swal from 'sweetalert2';

const factureStore = useFactureStore();
const searchQuery = ref("");
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
const calculateMontantRestant = (facture) => {
  return (facture.montant * (1 - facture.pourcentage_paiement / 100)).toFixed(2);
};
onMounted(async () => {
  await factureStore.loadDataFromApi();
});

const supprimerFacture = async (id) => {
  const confirmation = await Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Cette action est irréversible!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#218838',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!'
  });

  if (confirmation.isConfirmed) {
    try {
      await factureStore.deleteFacture(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de la facture :", error);
    }
  }
};
const filteredFactures = computed(() => {
  return factureStore.factures.filter(facture => 
    (facture.client && facture.client.nom.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
    facture.montant.toString().includes(searchQuery.value)
  );
});
</script>

<style scoped>
.container {
  max-width: 1150px;
}

.header {
  background-color: #f5f5dc;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.title {
  font-size: 1.2rem;
  margin: 0;
  color: #218838;
}

.search-input {
  max-width: 200px;
}

.btn-add {
  font-size: 1rem;
  padding: 5px 15px;
  background-color: white;
  color: #218838;
  border: 1px solid #218838;
  border-radius: 5px;
}

.btn-add:hover {
  background-color: #218838;
  color: white;
}

.table {
  width: 100%;
}

.table thead {
  border-top: 2px solid #218838;
}

.action-icon {
  color: #218838;
  margin-right: 8px;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
}

.action-icon:hover {
  color: #1e7e34;
}

.btn-delete {
  color: #dc3545;
}

.btn-delete:hover {
  color: #c82333;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>
