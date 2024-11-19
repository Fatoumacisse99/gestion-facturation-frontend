<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Tableau de Bord - Gestion de Facturation</h1>
    </header>

    <!-- Alertes d'échéance -->
    <div v-if="alerts.length > 0" class="alerts-section">
      <h2 class="section-title">Alertes d'Échéance</h2>
      <ul>
        <li v-for="alert in alerts" :key="alert.factureId">
          <strong>Facture #{{ alert.factureId }}:</strong> {{ alert.message }}
        </li>
      </ul>
    </div>

    <!-- Indicateurs Financiers -->
    <div class="financial-indicators">
      <div class="indicator-card" v-for="indicator in indicators" :key="indicator.label">
        <h3>{{ indicator.label }}</h3>
        <p>{{ indicator.value }} €</p>
      </div>
    </div>

    <!-- Statistiques Clients -->
    <h2 class="section-title">Statistiques Clients</h2>
    <table class="client-stats">
      <thead>
        <tr>
          <th>Client</th>
          <th>Montant Total Dû</th>
          <th>Dernière Facture</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.nom }}</td>
          <td>{{ client.total_du }} €</td>
          <td>{{ formatDate(client.derniere_facture) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useFactureStore } from "@/stores/factureStore";
import { useClientStore } from "@/stores/clientStore";

const factureStore = useFactureStore();
const clientStore = useClientStore();

const indicators = ref([
  { label: "Total Facturé", value: 0 },
  { label: "Paiements Reçus", value: 0 },
  { label: "Montant Total Dû", value: 0 },
]);

const clients = ref([]);

// Computed pour récupérer les alertes
const alerts = computed(() => factureStore.alerts);

const loadDashboardData = async () => {
  await factureStore.loadDataFromApi();
  await clientStore.loadClientData();

  // Calcul des indicateurs financiers à partir des factures
  indicators.value[0].value = factureStore.factures.reduce(
    (total, facture) => total + (facture.montant_total || 0),
    0
  );
  indicators.value[1].value = factureStore.factures.reduce(
    (total, facture) => total + (facture.montant_paye || 0),
    0
  );
  indicators.value[2].value = factureStore.factures.reduce(
    (total, facture) => total + (facture.montant_du || 0),
    0
  );

  // Préparer les statistiques clients
  clients.value = clientStore.clients.map(client => ({
    nom: client.nom,
    total_du: client.factures.reduce((total, facture) => total + facture.montant_du, 0),
    derniere_facture: client.factures[0]?.date_creation,
  }));
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

onMounted(loadDashboardData);
</script>


<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background-color: #f4f4ec;
  min-height: 100vh;
}

.dashboard-header {
  text-align: center;
  color: #218838;
  padding: 15px;
  font-size: 2rem;
  font-weight: bold;
  background-color: #e0e0d1;
  width: 100%;
  border-bottom: 4px solid #1e7e34;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.alerts-section {
  width: 80%;
  background-color: #fff3cd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.alerts-section ul {
  list-style-type: none;
  padding: 0;
}

.alerts-section li {
  font-size: 1rem;
  color: #856404;
  margin-bottom: 8px;
}

.financial-indicators {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.indicator-card {
  width: 200px;
  height: 100px;
  background: #ffffff;
  border: 2px solid #218838;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.indicator-card h3 {
  color: #218838;
  font-size: 1.1rem;
  font-weight: 600;
}

.indicator-card p {
  color: #1e7e34;
  font-size: 1.5rem;
  font-weight: bold;
}

.section-title {
  color: #218838;
  font-size: 1.5rem;
  margin-top: 30px;
  font-weight: 600;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #1e7e34;
  width: 80%;
}
</style>
