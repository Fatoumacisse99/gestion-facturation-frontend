<template>
  <div class="container mt-4">
    <div class="header d-flex justify-content-between align-items-center mb-3 p-3">
      <h2 class="title">Modifier le Mode de Paiement</h2>
    </div>
    <form @submit.prevent="updateModePaiement" class="styled-form">
      <div class="mb-3">
        <label class="form-label">Libellé:</label>
        <input v-model="modePaiement.libelle" type="text" required class="form-control form-control-sm" />
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">Enregistrer</button>
        <button type="button" @click="annuler" class="btn btn-cancel flex-grow-1">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useModePaiementStore } from "@/stores/modePaiementStore";

const modePaiementStore = useModePaiementStore();
const router = useRouter();
const route = useRoute();

const modePaiement = ref({
  libelle: "",
});

onMounted(async () => {
  const id = route.params.id;
  const paymentMode = await modePaiementStore.getModePaiementById(id);
  modePaiement.value = { ...paymentMode };
});

const updateModePaiement = async () => {
  await modePaiementStore.updateModePaiement(modePaiement.value);
  router.push("/modePaiements");
};

const annuler = () => {
  router.push("/modePaiements");
};
</script>

<style scoped>
.container {
  max-width: 500px;
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
