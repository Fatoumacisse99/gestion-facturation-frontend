<template>
  <div class="container mt-4">
    <div class="header d-flex justify-content-between align-items-center mb-3 p-3">
      <h2 class="title">Liste des Paiements</h2>
      <router-link to="/paiements/ajout" class="btn btn-add">Ajouter un Paiement</router-link>
    </div>
    <div class="mb-3 d-flex justify-content-end">
      <input
        v-model="filtre"
        type="text"
        class="form-control search-input"
        placeholder="Filtrer les paiements..."
      />
    </div>

    <table class="table table-bordered">
      <thead class="table-light border-top">
        <tr>
          <th>Date</th>
          <th>Montant</th>
          <th>Facture</th>
          <th>Mode de Paiement</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paiement in paiementsFiltres" :key="paiement.id">
          <td>{{ formatDate(paiement.date_paiement) }}</td>
          <td>{{ paiement.montant_paye }} €</td>
          <td>FT{{ paiement.facture ? paiement.facture.id : 'Non défini' }}</td>
          <td>{{ paiement.modePaiement ? paiement.modePaiement.libelle : 'Non défini' }}</td>
          <td class="text-center">
            <router-link :to="{ name: 'DetailPaiement', params: { id: paiement.id } }" class="action-icon">
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link :to="{ name: 'ModifiePaiement', params: { id: paiement.id } }" class="action-icon">
              <i class="fas fa-edit"></i>
            </router-link>
            <button v-if="paiementStore.userRole === 'ADMIN'" @click="supprimerPaiement(paiement.id)" class="action-icon btn-delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { usePaiementStore } from '@/stores/paiementStore';
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';

const paiementStore = usePaiementStore();
const filtre = ref('');

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const chargerPaiements = async () => {
  await paiementStore.loadDataFromApi();
};

const paiementsFiltres = computed(() => {
  return paiementStore.paiements.filter(p =>
    (p.modePaiement && p.modePaiement.libelle.toLowerCase().includes(filtre.value.toLowerCase())) ||
    p.montant_paye.toString().includes(filtre.value)
  );
});

const supprimerPaiement = async (id) => {
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
      await paiementStore.deletePaiement(id);
      Swal.fire("Succès", "Paiement supprimé avec succès!", "success");
    } catch (error) {
      Swal.fire("Erreur", error.message, "error");
    }
  }
};
onMounted(paiementStore.loadDataFromApi);
</script>

<style scoped>
.container {
  max-width: 1000px;
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
