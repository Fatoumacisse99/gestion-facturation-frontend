<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center mb-3 p-3">
      <h2 class="title">Modifier le Paiement</h2>
    </div>
    <form @submit.prevent="modifierPaiement" class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Date du Paiement:</label>
          <input v-model="paiement.date_paiement" required type="date" class="form-control form-control-sm" />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Montant:</label>
          <input v-model="paiement.montant_paye" required type="number" class="form-control form-control-sm" />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Mode de Paiement:</label>
        <select v-model="paiement.id_mode_paiement" required class="form-control form-control-sm">
          <option v-for="mode in modePaiementStore.modesPaiement" :key="mode.id" :value="mode.id">
            {{ mode.libelle }}
          </option>
        </select>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">Enregistrer les modifications</button>
        <button type="button" @click="annuler" class="btn btn-cancel flex-grow-1">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { usePaiementStore } from "@/stores/paiementStore";
import { useModePaiementStore } from "@/stores/modePaiementStore";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

const paiementStore = usePaiementStore();
const modePaiementStore = useModePaiementStore(); // Store des modes de paiement
const route = useRoute();
const router = useRouter();
const paiement = ref({ date_paiement: "", montant_paye: "", id_mode_paiement: "" });

const chargerPaiement = async () => {
  const id = route.params.id;
  const paiementDetails = await paiementStore.getPaiementById(id);
  
  // Convertir la date au format attendu par le champ de type "date"
  if (paiementDetails.date_paiement) {
    paiementDetails.date_paiement = new Date(paiementDetails.date_paiement).toISOString().split("T")[0];
  }
  
  paiement.value = { ...paiementDetails };
};

const modifierPaiement = async () => {
  await paiementStore.updatePaiement(paiement.value);
  Swal.fire("Modifié!", "Le paiement a été modifié avec succès.", "success");
  router.push("/paiements");
};

const annuler = () => {
  router.push("/paiements");
};

onMounted(async () => {
  await modePaiementStore.loadDataFromApi(); // Charger les modes de paiement
  await chargerPaiement();
});
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
