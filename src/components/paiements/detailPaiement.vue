<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center mb-3 p-3">
      <h2 class="title">Détails du Paiement</h2>
    </div>
    <div class="styled-form" v-if="paiement">
      <p><strong>Date :</strong> {{ formatDate(paiement.date_paiement) }}</p>
      <p><strong>Montant :</strong> {{ paiement.montant_paye }} €</p>
      <p v-if="paiement.modePaiement"><strong>Mode de Paiement :</strong> {{ paiement.modePaiement.libelle }}</p>
      <p v-else><strong>Mode de Paiement :</strong> Non défini</p>
      <div class="d-flex justify-content-center mt-4">
        <button @click="retourListe" class="btn btn-secondary flex-grow-1">Retour à la liste</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePaiementStore } from "@/stores/paiementStore";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const paiementStore = usePaiementStore();
const route = useRoute();
const router = useRouter();
const paiement = ref({ date_paiement: "", montant_paye: "", modePaiement: { libelle: "" } });

// Fonction pour formater la date au format local
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const chargerPaiement = async () => {
  try {
    const id = route.params.id;
    const paiementDetails = await paiementStore.getPaiementById(id);
    paiement.value = { ...paiementDetails, modePaiement: paiementDetails.modePaiement || { libelle: "Non défini" } };
  } catch (error) {
    console.error("Erreur lors du chargement du paiement :", error);
  }
};

const retourListe = () => {
  router.push("/paiements");
};

onMounted(chargerPaiement);
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

p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.btn-secondary {
  background-color: transparent;
  color: #218838;
  border: 1px solid #218838;
  font-weight: bold;
  width: 100%;
}

.btn-secondary:hover {
  background-color: #218838;
  color: white;
}
</style>
