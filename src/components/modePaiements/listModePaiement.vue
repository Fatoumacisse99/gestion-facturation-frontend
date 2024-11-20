<!-- <template>
    <div class="container mt-4">
      <div class="header d-flex justify-content-between align-items-center mb-3 p-3">
        <h2 class="title">Modes de Paiement</h2>
        <router-link to="/modePaiements/ajout" class="btn btn-add">Ajouter un Mode de Paiement</router-link>
      </div>
      <div class="mb-3 d-flex justify-content-end">
        <input type="text" class="form-control search-input" placeholder="Rechercher par libellé" v-model="searchQuery" />
      </div>
  
      <table class="table table-bordered">
        <thead class="table-light border-top">
          <tr>
            <th>ID</th>
            <th>Libellé</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mode in filteredModesPaiement" :key="mode.id">
            <td>{{ mode.id }}</td>
            <td>{{ mode.libelle }}</td>
            <td class="text-center">
              <router-link :to="{ name: 'DetailModePaiement', params: { id: mode.id } }" class="action-icon">
                <i class="fas fa-eye"></i>
              </router-link>
  
              <router-link :to="{ name: 'ModifieModePaiement', params: { id: mode.id } }" class="action-icon">
                <i class="fas fa-edit"></i>
              </router-link>
  
              <button @click="supprimerModePaiement(mode.id)" class="action-icon btn-delete">
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
import Swal from "sweetalert2";
import { useModePaiementStore } from "@/stores/modePaiementStore";

const modePaiementStore = useModePaiementStore();
const searchQuery = ref("");

// Charger les données chaque fois que le composant est monté
onMounted(async () => {
  await modePaiementStore.loadDataFromApi();
});

const supprimerModePaiement = async (id) => {
  const confirmation = await Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Cette action est irréversible !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#218838',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!'
  });

  if (confirmation.isConfirmed) {
    try {
      await modePaiementStore.deleteModePaiement(id);
      // Recharge les données pour actualiser la liste après suppression
      await modePaiementStore.loadDataFromApi();
    } catch (error) {
      console.error("Erreur lors de la suppression du mode de paiement :", error);
    }
  }
};

const filteredModesPaiement = computed(() => {
  return modePaiementStore.modesPaiement.filter(mode =>
    mode.libelle.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
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
  color: #218838; /* Vert principal */
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
</style> -->
<!-- ModePaiementList.vue -->
<template>
    <div class="container mt-4">
      <div class="header d-flex justify-content-between align-items-center mb-3 p-3">
        <h2 class="title">Modes de Paiement</h2>
        <router-link to="/modePaiements/ajout" class="btn btn-add">Ajouter un Mode de Paiement</router-link>
      </div>
      <div class="mb-3 d-flex justify-content-end">
        <input type="text" class="form-control search-input" placeholder="Rechercher par libellé" v-model="searchQuery" />
      </div>
  
      <table class="table table-bordered">
        <thead class="table-light border-top">
          <tr>
            <th>ID</th>
            <th>Libellé</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mode in filteredModesPaiement" :key="mode.id">
            <td>{{ mode.id }}</td>
            <td>{{ mode.libelle }}</td>
            <td class="text-center">
              <router-link :to="{ name: 'DetailModePaiement', params: { id: mode.id } }" class="action-icon">
                <i class="fas fa-eye"></i>
              </router-link>
  
              <router-link :to="{ name: 'ModifieModePaiement', params: { id: mode.id } }" class="action-icon">
                <i class="fas fa-edit"></i>
              </router-link>
  
              <button v-if="modePaiementStore.userRole !== 'ADMIN'" @click="supprimerModePaiement(mode.id)" class="action-icon btn-delete">
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
  import { useModePaiementStore } from "@/stores/modePaiementStore";
  
  const modePaiementStore = useModePaiementStore();
  const searchQuery = ref("");
  
  // Charger les données chaque fois que le composant est monté
  onMounted(async () => {
    await modePaiementStore.loadDataFromApi();
    console.log("Modes de paiement dans le composant :", modePaiementStore.modesPaiement);
  });
  
  const supprimerModePaiement = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce mode de paiement ?")) {
      await modePaiementStore.deleteModePaiement(id);
      await modePaiementStore.loadDataFromApi();
    }
  };
  
  const filteredModesPaiement = computed(() => {
    return modePaiementStore.modesPaiement
      .filter(mode => mode && mode.libelle) // Vérifie que chaque élément est défini
      .filter(mode =>
        mode.libelle.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
  });
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
  