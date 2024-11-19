<template>
  <div v-if="loading" class="text-center">
    <p>Chargement des données, veuillez patienter...</p>
  </div>
  <div v-else class="container mt-5 facture-detail">
    <h2 class="text-center">Détails de la Facture #{{ facture.id }}</h2>
    
    <div class="row mt-4">
      <div class="col-md-6 mb-3">
        <label class="form-label">Date d'Émission</label>
        <p class="form-control-static">{{ formattedDateEmission }}</p>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Date d'Échéance</label>
        <p class="form-control-static">{{ formattedDateEcheance }}</p>
      </div>
      <div class="col-md-6 mb-3" v-if="facture.client">
        <label class="form-label">Client</label>
        <p class="form-control-static">{{ facture.client.nom }} {{ facture.client.prenom }}</p>
      </div>
    </div>

    <!-- Table des détails de la facture -->
    <h5 class="mt-4">Détails de la Commande</h5>
    <table class="table table-bordered">
      <thead class="table-light border-top">
        <tr>
          <th>Nom de l'Article</th>
          <th>Quantité</th>
          <th>Prix Unitaire (€)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ligne, index) in facture.lignes || []" :key="index">
          <td>{{ ligne.nom }}</td>
          <td>{{ ligne.quantite }}</td>
          <td>{{ ligne.prix_unitaire }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Affichage du Montant Total -->
    <div class="row mt-3">
      <div class="col-md-6">
        <h5>Montant Total: {{ montantTotal }} €</h5>
      </div>
    </div>

    <!-- Bouton de retour -->
    <div class="text-end mt-4">
      <button type="button" class="btn btn-secondary" @click="annuler">Retour à la liste</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFactureStore } from "@/stores/factureStore";

const route = useRoute();
const router = useRouter();
const factureStore = useFactureStore();

const facture = ref({
  id: null,
  date_emission: "",
  date_echeance: "",
  id_client: null,
  client: null, // Initialise client à null pour éviter l'erreur de chargement
  lignes: [],
});

const loading = ref(true);

// Formater les dates pour les afficher sous un format lisible
const formattedDateEmission = computed(() =>
  facture.value.date_emission ? new Date(facture.value.date_emission).toLocaleDateString() : ""
);
const formattedDateEcheance = computed(() =>
  facture.value.date_echeance ? new Date(facture.value.date_echeance).toLocaleDateString() : ""
);

const montantTotal = computed(() =>
  (facture.value.lignes || []).reduce((total, ligne) => total + ligne.quantite * ligne.prix_unitaire, 0)
);

onMounted(async () => {
  try {
    if (route.params.id) {
      const fetchedFacture = await factureStore.getFactureById(route.params.id);
      if (fetchedFacture) {
        facture.value = { ...fetchedFacture, lignes: fetchedFacture.LigneFacture || [] };
      } else {
        console.error("Facture non trouvée");
      }
    } else {
      console.error("ID de facture manquant");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  } finally {
    loading.value = false;
  }
});

const annuler = () => {
  router.push("/factures");
};
</script>

<style scoped>
.container.facture-detail {
  max-width: 800px;
  background-color: #f5f5dc; /* Beige */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  color: #218838; /* Vert principal */
}

.form-label {
  font-size: 0.9rem;
  color: #333;
}

.form-control-static {
  display: block;
  padding: 5px 10px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.table thead {
  background-color: #f8f9fa;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.text-end {
  margin-top: 20px;
}
</style>
