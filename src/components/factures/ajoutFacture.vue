<template>
  <div class="container mt-4">
    <h2>Ajouter une Facture</h2>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label">Date d'Émission</label>
        <input v-model="facture.date_emission" type="date" required class="form-control" />
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Date d'Échéance</label>
        <input v-model="facture.date_echeance" type="date" required class="form-control" />
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Client</label>
        <select v-model="facture.id_client" required class="form-control">
          <option value="" disabled selected>Sélectionnez un client</option>
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.nom }} {{ client.prenom }}
          </option>
        </select>
      </div>
    </div>
    <h5 class="mt-4">Détails de la Facture</h5>
    <table class="table">
      <thead>
        <tr>
          <th>Nom de l'Article</th>
          <th>Quantité</th>
          <th>Prix Unitaire (MRU)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ligne, index) in facture.lignes" :key="index">
          <td>
            <input v-model="ligne.nom" type="text" required class="form-control" placeholder="Description de l'article" />
          </td>
          <td>
            <input v-model.number="ligne.quantite" type="number" min="1" required class="form-control" />
          </td>
          <td>
            <input v-model.number="ligne.prix_unitaire" type="number" min="0" step="0.01" required class="form-control" />
          </td>
          <td>
            <button type="button" class="btn btn-danger btn-sm" @click="supprimerLigne(index)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success mb-3" @click="ajouterLigne">Ajouter un Détail</button>
    <div class="row mt-3">
      <div class="col-md-6">
        <h5>Montant Total: {{ montantTotal }} MRU</h5>
      </div>
    </div>
    <div class="text-end mt-4">
      <button type="button" class="btn btn-secondary me-2" @click="annuler">Retour à l'accueil</button>
      <button type="button" class="btn btn-primary" @click="ajouterFacture">Soumettre</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFactureStore } from "@/stores/factureStore";
import { useClientStore } from "@/stores/clientStore";
import Swal from 'sweetalert2';

const router = useRouter();
const factureStore = useFactureStore();
const clientStore = useClientStore();
const facture = ref({
  date_emission: new Date().toISOString().split("T")[0],
  date_echeance: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0],
  id_client: null,
  id_utilisateur: null,
  lignes: [{ nom: "", quantite: 1, prix_unitaire: 0 }],
});

const clients = ref([]);
const montantTotal = computed(() =>
  facture.value.lignes.reduce((total, ligne) => total + ligne.quantite * ligne.prix_unitaire, 0)
);
onMounted(async () => {
  await clientStore.loadDataFromApi();
  clients.value = clientStore.clients;
});

const ajouterLigne = () => {
  facture.value.lignes.push({ nom: "", quantite: 1, prix_unitaire: 0 });
};

const supprimerLigne = (index) => {
  facture.value.lignes.splice(index, 1);
};

const ajouterFacture = async () => {
  if (!facture.value.date_emission || !facture.value.date_echeance || !facture.value.id_client) {
    Swal.fire("Erreur", "Veuillez remplir tous les champs obligatoires.", "error");
    return;
  }
  
  try {
    await factureStore.addFacture({ 
      ...facture.value, 
      montant: montantTotal.value.toFixed(2) 
    });
    router.push("/factures");
  } catch (error) {
    console.error("Erreur lors de l'ajout de la facture :", error);
    Swal.fire("Erreur", "Une erreur est survenue lors de l'ajout de la facture.", "error");
  }
};

const annuler = () => {
  router.push("/home");
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.form-label {
  font-size: 0.9rem;
  color: #333;
}

.table thead {
  background-color: #f8f9fa;
}

.btn-primary {
  background-color: #218838;
  border-color: #218838;
  color: white;
}

.btn-primary:hover {
  background-color: #1e7e34;
  border-color: #1e7e34;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  color: white;
}

.btn-success {
  background-color: #218838;
  border-color: #218838;
  color: white;
}

.btn-success:hover {
  background-color: #1e7e34;
  border-color: #1e7e34;
}

.text-end {
  margin-top: 20px;
}
</style>
