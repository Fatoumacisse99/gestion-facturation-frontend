<template>
  <div v-if="loading" class="text-center">
    <p>Chargement des données, veuillez patienter...</p>
  </div>
  <div v-else class="container mt-4">
    <h2>Modifier la Facture FT{{ facture.id }}</h2>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label">Date d'Émission</label>
        <input v-model="facture.date_emission" type="date" required class="form-control" />
        <span class="error" v-if="errors.date_emission">{{ errors.date_emission }}</span>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Date d'Échéance</label>
        <input v-model="facture.date_echeance" type="date" required class="form-control" />
        <span class="error" v-if="errors.date_echeance">{{ errors.date_echeance }}</span>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Client</label>
        <select v-model="facture.id_client" required class="form-control">
          <option value="" disabled selected>Sélectionnez un client</option>
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.nom }} {{ client.prenom }}
          </option>
        </select>
        <span class="error" v-if="errors.id_client">{{ errors.id_client }}</span>
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
            <span class="error" v-if="errors[`lignes.${index}.nom`]">{{ errors[`lignes.${index}.nom`] }}</span>
          </td>
          <td>
            <input v-model.number="ligne.quantite" type="number" min="1" required class="form-control" />
            <span class="error" v-if="errors[`lignes.${index}.quantite`]">{{ errors[`lignes.${index}.quantite`] }}</span>
          </td>
          <td>
            <input v-model.number="ligne.prix_unitaire" type="number" min="0" step="0.01" required class="form-control" />
            <span class="error" v-if="errors[`lignes.${index}.prix_unitaire`]">{{ errors[`lignes.${index}.prix_unitaire`] }}</span>
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
      <button type="button" class="btn btn-secondary me-2" @click="annuler">Retour à la liste</button>
      <button type="button" class="btn btn-primary" @click="modifierFacture">Enregistrer les modifications</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFactureStore } from "@/stores/factureStore";
import { useClientStore } from "@/stores/clientStore";

const router = useRouter();
const route = useRoute();
const factureStore = useFactureStore();
const clientStore = useClientStore();

const facture = ref({
  id: null,
  date_emission: "",
  date_echeance: "",
  id_client: null,
  lignes: [{ nom: "", quantite: 1, prix_unitaire: 0 }],
});

const clients = ref([]);
const errors = ref({});
const loading = ref(true);

const montantTotal = computed(() =>
  facture.value.lignes.reduce((total, ligne) => total + ligne.quantite * ligne.prix_unitaire, 0)
);

onMounted(async () => {
  try {
    await clientStore.loadDataFromApi();
    clients.value = clientStore.clients;

    if (route.params.id) {
      const fetchedFacture = await factureStore.getFactureById(route.params.id);

      if (fetchedFacture) {
        facture.value.id = fetchedFacture.id;
        facture.value.date_emission = fetchedFacture.date_emission.split("T")[0];
        facture.value.date_echeance = fetchedFacture.date_echeance.split("T")[0];
        facture.value.id_client = fetchedFacture.id_client;
        facture.value.lignes = fetchedFacture.LigneFacture || [];
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

const ajouterLigne = () => {
  facture.value.lignes.push({ nom: "", quantite: 1, prix_unitaire: 0 });
};

const supprimerLigne = (index) => {
  facture.value.lignes.splice(index, 1);
};

const validateForm = () => {
  const validationErrors = {};

  if (!facture.value.date_emission) {
    validationErrors.date_emission = "La date d'émission est requise.";
  }
  if (!facture.value.date_echeance) {
    validationErrors.date_echeance = "La date d'échéance est requise.";
  }
  if (!facture.value.id_client) {
    validationErrors.id_client = "Veuillez sélectionner un client.";
  }

  facture.value.lignes.forEach((ligne, index) => {
    if (!ligne.nom) {
      validationErrors[`lignes.${index}.nom`] = "Le nom de l'article est requis.";
    }
    if (!ligne.quantite || ligne.quantite < 1) {
      validationErrors[`lignes.${index}.quantite`] = "La quantité doit être supérieure à 0.";
    }
    if (!ligne.prix_unitaire || ligne.prix_unitaire < 0) {
      validationErrors[`lignes.${index}.prix_unitaire`] = "Le prix unitaire doit être supérieur à 0.";
    }
  });

  errors.value = validationErrors;

  return Object.keys(validationErrors).length === 0;
};

const modifierFacture = async () => {
  if (!validateForm()) {
    console.log("Formulaire non valide :", errors.value);
    return;
  }

  try {
    await factureStore.updateFacture({ ...facture.value, montant: montantTotal.value.toFixed(2) });
    router.push("/factures");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la facture :", error);
  }
};

const annuler = () => {
  router.push("/factures");
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
  .error {
  color: red;
  font-size: 0.875em;
  margin-top: 0.25rem;
  display: block;
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
  
   <!-- <template>
    <div v-if="loading" class="text-center">
      <p>Chargement des données, veuillez patienter...</p>
    </div>
    <div v-else class="container mt-4">
      <h2>Modifier la Facture #{{ facture.id }}</h2>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Date d'Émission</label>
          <input v-model="facture.date_emission" type="date" required class="form-control" />
          <span class="error" v-if="errors.date_emission">{{ errors.date_emission }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Date d'Échéance</label>
          <input v-model="facture.date_echeance" type="date" required class="form-control" />
          <span class="error" v-if="errors.date_echeance">{{ errors.date_echeance }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Client</label>
          <select v-model="facture.id_client" required class="form-control">
            <option value="" disabled>Sélectionnez un client</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.nom }} {{ client.prenom }}
            </option>
          </select>
          <span class="error" v-if="errors.id_client">{{ errors.id_client }}</span>
        </div>
      </div>
      <h5 class="mt-4">Détails de la Commande</h5>
      <table class="table">
        <thead>
          <tr>
            <th>Nom de l'Article</th>
            <th>Quantité</th>
            <th>Prix Unitaire (€)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ligne, index) in facture.lignes" :key="index">
            <td>
              <input v-model="ligne.nom" type="text" required class="form-control" placeholder="Description de l'article" />
              <span class="error" v-if="errors[`lignes.${index}.nom`]">{{ errors[`lignes.${index}.nom`] }}</span>
            </td>
            <td>
              <input v-model.number="ligne.quantite" type="number" min="1" required class="form-control" />
              <span class="error" v-if="errors[`lignes.${index}.quantite`]">{{ errors[`lignes.${index}.quantite`] }}</span>
            </td>
            <td>
              <input v-model.number="ligne.prix_unitaire" type="number" min="0" step="0.01" required class="form-control" />
              <span class="error" v-if="errors[`lignes.${index}.prix_unitaire`]">{{ errors[`lignes.${index}.prix_unitaire`] }}</span>
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
          <h5>Montant Total: {{ montantTotal }} €</h5>
        </div>
      </div>
      <div class="text-end mt-4">
        <button type="button" class="btn btn-secondary me-2" @click="annuler">Retour à la liste</button>
        <button type="button" class="btn btn-primary" @click="modifierFacture">Enregistrer les modifications</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useFactureStore } from "@/stores/factureStore";
  import { useClientStore } from "@/stores/clientStore";
  
  const router = useRouter();
  const route = useRoute();
  const factureStore = useFactureStore();
  const clientStore = useClientStore();
  
  const facture = ref({
    id: null,
    date_emission: "",
    date_echeance: "",
    id_client: null,
    lignes: [{ nom: "", quantite: 1, prix_unitaire: 0 }],
  });
  
  const clients = ref([]);
  const loading = ref(true); 
  
  const montantTotal = computed(() =>
    facture.value.lignes.reduce((total, ligne) => total + ligne.quantite * ligne.prix_unitaire, 0)
  );
  
  // Charger les données des clients et la facture à modifier au montage
  onMounted(async () => {
    try {
      await clientStore.loadDataFromApi();
      clients.value = clientStore.clients;
  
      // Charger la facture à modifier en fonction de l'ID de la route
      if (route.params.id) {
        const fetchedFacture = await factureStore.getFactureById(route.params.id);
  
        if (fetchedFacture) {
          facture.value.id = fetchedFacture.id;
          facture.value.date_emission = fetchedFacture.date_emission.split("T")[0]; 
          facture.value.date_echeance = fetchedFacture.date_echeance.split("T")[0];
          facture.value.id_client = fetchedFacture.id_client;
          facture.value.lignes = fetchedFacture.LigneFacture || []; 
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
  
  // Ajouter une ligne de détail
  const ajouterLigne = () => {
    facture.value.lignes.push({ nom: "", quantite: 1, prix_unitaire: 0 });
  };
  
  // Supprimer une ligne de détail
  const supprimerLigne = (index) => {
    facture.value.lignes.splice(index, 1);
  };
  
  // Validation et mise à jour de la facture
  const modifierFacture = async () => {
    // Validation des champs requis côté client (optionnelle)
    if (!facture.value.date_emission || !facture.value.date_echeance || !facture.value.id_client) {
      // Optionnel : Ajouter des erreurs locales ici si nécessaire
      // Exemple :
      // factureStore.errors.date_emission = "La date d'émission est requise.";
      // Cependant, nous utilisons la validation côté serveur
      return;
    }
  
    try {
      await factureStore.updateFacture({ 
        ...facture.value, 
        montant: montantTotal.value.toFixed(2) 
      });
      if (Object.keys(factureStore.errors).length === 0) {
        // Si pas d'erreurs, rediriger vers la liste des factures
        router.push("/factures");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la facture :", error);
      // Les erreurs de validation sont déjà gérées par le store
      // Les autres erreurs peuvent être affichées ici si nécessaire
    }
  };
  
  // Annuler la modification de la facture et retourner à la liste
  const annuler = () => {
    router.push("/factures");
  };
  
  // Accéder aux erreurs du store
  const errors = computed(() => factureStore.errors);
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
  
  .error {
    color: red;
    font-size: 0.875em;
    margin-top: 0.25rem;
    display: block;
  }
  </style>
   -->