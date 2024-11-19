<template>
  <div class="container mt-4">
    <div class="header d-flex justify-content-between align-items-center mb-3 p-3">
      <h2 class="title">Utilisateurs</h2>
      <router-link to="/utilisateurs/ajout" class="btn btn-add">Ajouter</router-link>
    </div>
    <div class="mb-3 d-flex justify-content-end">
      <input type="text" class="form-control search-input" placeholder="Filtrer" v-model="searchQuery" />
    </div>
    <table class="table table-bordered">
      <thead class="table-light border-top">
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Statut</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUtilisateurs" :key="user.id">
          <td>{{ user.nom }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <span :class="user.statut === 'actif' ? 'text-success' : 'text-danger'">
              {{ user.statut }}
            </span>
          </td>
          <td class="text-center">
            <button
              @click="toggleStatut(user)"
              :class="user.statut === 'actif' ? 'btn-disable me-2' : 'btn-enable me-2'"
            >
              {{ user.statut === 'actif' ? 'Désactiver' : 'Activer' }}
            </button>
            <router-link :to="{ name: 'DetailUtilisateur', params: { id: user.id } }" class="action-icon">
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link :to="{ name: 'ModifieUtilisateur', params: { id: user.id } }" class="action-icon">
              <i class="fas fa-edit"></i>
            </router-link>
            <button @click="supprimerUtilisateur(user.id)" class="action-icon btn-delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useUtilisateurStore } from "@/stores/utilisateurStore";
import { onMounted, computed, ref } from "vue";
import Swal from "sweetalert2";

const utilisateurStore = useUtilisateurStore();
const searchQuery = ref("");

// Fonction pour supprimer un utilisateur
const supprimerUtilisateur = async (id) => {
  const confirmation = await Swal.fire({
    title: "Êtes-vous sûr?",
    text: "Cette action est irréversible!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#218838",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, supprimer!",
  });

  if (confirmation.isConfirmed) {
    try {
      await utilisateurStore.deleteUtilisateur(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  }
};

// Fonction pour basculer le statut d'un utilisateur
const toggleStatut = async (user) => {
  const newStatut = user.statut === "actif" ? "inactif" : "actif";

  try {
    await utilisateurStore.updateStatut(user.id, newStatut);
    user.statut = newStatut; // Mettre à jour localement
    // Optionnel: Vous pouvez afficher un message de succès
    // Swal.fire("Succès", `Statut mis à jour en ${newStatut}.`, "success");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
  }
};

// Filtrer les utilisateurs en fonction de la recherche
const filteredUtilisateurs = computed(() => {
  return utilisateurStore.utilisateurs.filter((user) =>
    user.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Charger les données lors du montage du composant
onMounted(() => {
  utilisateurStore.loadDataFromApi();
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

.text-success {
  color: green;
}

.text-danger {
  color: red;
}

.btn-enable {
  background-color: #218838;
  color: white;
  border: 1px solid #218838;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-enable:hover {
  background-color: #1e7e34;
}

.btn-disable {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-disable:hover {
  background-color: #c82333;
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


