<!-- <template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Tableau de Bord</h1>
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h3 class="text-success">{{ totalPaye }} MRU</h3>
            <p class="mb-0">Total payé</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h3 class="text-danger">{{ totalImpayes }} MRU</h3>
            <p class="mb-0">Total impayé</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="alerts.length > 0" class="card shadow-sm mb-4">
      <div class="card-header bg-warning text-white">
        <h5 class="mb-0">Alertes d'Échéance</h5>
      </div>
      <div class="card-body">
        <table class="table table-striped table-bordered">
          <thead class="table-dark">
            <tr>
              <th>N° Facture</th>
              <th>Nom client</th>
              <th>Retard (jours)</th>
              <th>Montant restant (MRU)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alert in alerts" :key="alert.factureId">
              <td>{{ alert.factureId }}</td>
              <td>{{ alert.client }}</td>
              <td class="text-danger">{{ alert.retard }}</td>
              <td>{{ alert.solde }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Indicateurs Financiers</h5>
            <canvas id="financialChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Statistiques Clients</h5>
            <canvas id="clientChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Chart from "chart.js/auto";
import { useFactureStore } from "@/stores/factureStore";
import { useClientStore } from "@/stores/clientStore";
import { usePaiementStore } from "@/stores/paiementStore";

// Stores
const factureStore = useFactureStore();
const clientStore = useClientStore();
const paiementStore = usePaiementStore();

// Références pour les graphiques
const financialChart = ref(null);
const clientChart = ref(null);

// Calculs réactifs
const totalPaye = computed(() =>
  paiementStore.paiements.reduce((sum, paiement) => sum + Number(paiement.montant_paye || 0), 0)
);

const totalImpayes = computed(() =>
  factureStore.factures.reduce((sum, facture) => {
    const totalPayeFacture = paiementStore.paiements
      .filter((paiement) => paiement.id_facture === facture.id)
      .reduce((subSum, paiement) => subSum + Number(paiement.montant_paye || 0), 0);
    return sum + (facture.montant - totalPayeFacture);
  }, 0)
);

const alerts = computed(() =>
  factureStore.factures
    .filter(
      (facture) =>
        new Date(facture.date_echeance) < new Date() && facture.pourcentage_paiement < 100
    )
    .map((facture) => ({
      factureId: facture.id,
      client: facture.client?.nom || "Inconnu",
      retard: Math.ceil(
        (new Date() - new Date(facture.date_echeance)) / (1000 * 60 * 60 * 24)
      ),
      solde: facture.montant - facture.montant_paye || 0,
    }))
);

// Charger les données et créer les graphiques
const loadDashboardData = async () => {
  await factureStore.loadDataFromApi();
  await clientStore.loadDataFromApi();
  await paiementStore.loadDataFromApi();

  const factures = factureStore.factures;
  const clients = clientStore.clients;

  // Données pour les graphiques
  const clientData = clients.map((client) => {
    const totalDue = factures
      .filter((facture) => facture.id_client === client.id)
      .reduce((sum, facture) => {
        const totalPayeFacture = paiementStore.paiements
          .filter((paiement) => paiement.id_facture === facture.id)
          .reduce((subSum, paiement) => subSum + Number(paiement.montant_paye || 0), 0);
        return sum + (facture.montant - totalPayeFacture);
      }, 0);

    return { name: client.nom, totalDue };
  });

  // Créer le graphique financier
  financialChart.value = new Chart(document.getElementById("financialChart"), {
    type: "bar",
    data: {
      labels: ["Total Payé", "Total Impayé"],
      datasets: [
        {
          label: "Montants (MRU)",
          data: [totalPaye.value, totalImpayes.value],
          backgroundColor: ["#218838", "#dc3545"],
        },
      ],
    },
  });

  // Créer le graphique client
  const clientNames = clientData.map((client) => client.name);
  const clientTotals = clientData.map((client) => client.totalDue);

  clientChart.value = new Chart(document.getElementById("clientChart"), {
    type: "pie",
    data: {
      labels: clientNames,
      datasets: [
        {
          data: clientTotals,
          backgroundColor: clientData.map(
            (_, index) => `hsl(${(index * 360) / clientData.length}, 70%, 60%)`
          ),
        },
      ],
    },
  });
};

// Charger les données lors du montage
onMounted(() => {
  loadDashboardData();
});
</script>


 <style scoped>
.card {
  border-radius: 10px;
}

.card-header {
  font-size: 1.25rem;
}

.card-body h3 {
  font-size: 2rem;
  font-weight: bold;
}

canvas {
  max-height: 300px;
}

</style>
 -->
 <template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Tableau de Bord</h1>
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h3 class="text-primary">{{ totalFacture }} MRU</h3>
            <p class="mb-0">Total facturé</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h3 class="text-success">{{ totalPaye }} MRU</h3>
            <p class="mb-0">Total payé</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <h3 class="text-danger">{{ totalImpayes }} MRU</h3>
            <p class="mb-0">Total impayé</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="alerts.length > 0" class="card shadow-sm mb-4">
      <div class="card-header bg-warning text-white">
        <h5 class="mb-0">Alertes d'Échéance</h5>
      </div>
      <div class="card-body">
        <table class="table table-striped table-bordered">
          <thead class="table-dark">
            <tr>
              <th>N° Facture</th>
              <th>Nom client</th>
              <th>Retard (jours)</th>
              <th>Montant restant (MRU)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alert in alerts" :key="alert.factureId">
              <td>{{ alert.factureId }}</td>
              <td>{{ alert.client }}</td>
              <td class="text-danger">{{ alert.retard }}</td>
              <td>{{ alert.solde }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Indicateurs Financiers</h5>
            <canvas id="financialChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Statistiques Clients</h5>
            <canvas id="clientChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import Chart from "chart.js/auto";
import { useFactureStore } from "@/stores/factureStore";
import { useClientStore } from "@/stores/clientStore";
import { usePaiementStore } from "@/stores/paiementStore";
const factureStore = useFactureStore();
const clientStore = useClientStore();
const paiementStore = usePaiementStore();

const financialChart = ref(null);
const clientChart = ref(null);
const totalFacture = computed(() =>
  factureStore.factures.reduce((sum, facture) => sum + Number(facture.montant || 0), 0)
);

const totalPaye = computed(() =>
  paiementStore.paiements.reduce((sum, paiement) => sum + Number(paiement.montant_paye || 0), 0)
);

const totalImpayes = computed(() =>
  factureStore.factures.reduce((sum, facture) => {
    const totalPayeFacture = paiementStore.paiements
      .filter((paiement) => paiement.id_facture === facture.id)
      .reduce((subSum, paiement) => subSum + Number(paiement.montant_paye || 0), 0);
    return sum + (facture.montant - totalPayeFacture);
  }, 0)
);

const alerts = computed(() =>
  factureStore.factures
    .filter(
      (facture) =>
        new Date(facture.date_echeance) < new Date() && facture.pourcentage_paiement < 100
    )
    .map((facture) => ({
      factureId: facture.id,
      client: facture.client?.nom || "Inconnu",
      retard: Math.ceil(
        (new Date() - new Date(facture.date_echeance)) / (1000 * 60 * 60 * 24)
      ),
      solde: facture.montant - facture.montant_paye || 0,
    }))
);
const loadDashboardData = async () => {
  await factureStore.loadDataFromApi();
  await clientStore.loadDataFromApi();
  await paiementStore.loadDataFromApi();

  const factures = factureStore.factures;
  const clients = clientStore.clients;
  const clientData = clients.map((client) => {
    const totalDue = factures
      .filter((facture) => facture.id_client === client.id)
      .reduce((sum, facture) => {
        const totalPayeFacture = paiementStore.paiements
          .filter((paiement) => paiement.id_facture === facture.id)
          .reduce((subSum, paiement) => subSum + Number(paiement.montant_paye || 0), 0);
        return sum + (facture.montant - totalPayeFacture);
      }, 0);

    return { name: client.nom, totalDue };
  });
  financialChart.value = new Chart(document.getElementById("financialChart"), {
    type: "bar",
    data: {
      labels: ["Total Facturé", "Total Payé", "Total Impayé"],
      datasets: [
        {
          label: "Montants (MRU)",
          data: [totalFacture.value, totalPaye.value, totalImpayes.value],
          backgroundColor: ["#007bff", "#218838", "#dc3545"],
        },
      ],
    },
  });
  const clientNames = clientData.map((client) => client.name);
  const clientTotals = clientData.map((client) => client.totalDue);

  clientChart.value = new Chart(document.getElementById("clientChart"), {
    type: "pie",
    data: {
      labels: clientNames,
      datasets: [
        {
          data: clientTotals,
          backgroundColor: clientData.map(
            (_, index) => `hsl(${(index * 360) / clientData.length}, 70%, 60%)`
          ),
        },
      ],
    },
  });
};
onMounted(() => {
  loadDashboardData();
});
</script>
<style scoped>
.card {
  border-radius: 10px;
}

.card-header {
  font-size: 1.25rem;
}

.card-body h3 {
  font-size: 2rem;
  font-weight: bold;
}

canvas {
  max-height: 300px;
}

</style>


