// import { defineStore } from "pinia";
// import axios from "axios";
// import Swal from "sweetalert2";

// axios.defaults.baseURL = "http://localhost:4000/api";

// export const useUtilisateurStore = defineStore("utilisateurStore", {
//   state: () => ({
//     utilisateurs: [], // Liste des utilisateurs
//   }),

//   actions: {
//     // Charger tous les utilisateurs
//     async loadDataFromApi() {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         this.utilisateurs = response.data.data.sort((a, b) => a.id - b.id); // Trier par ID
//       } catch (error) {
//         this.handleError(error, "Erreur lors du chargement des utilisateurs.");
//       }
//     },

//     // Ajouter un utilisateur
//     async addUtilisateur(utilisateur) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post("/users", utilisateur, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         this.utilisateurs.push(response.data.data); // Ajouter l'utilisateur
//         this.utilisateurs.sort((a, b) => a.id - b.id); // Trier après ajout
//         Swal.fire("Succès", "Utilisateur ajouté avec succès.", "success");
//       } catch (error) {
//         this.handleError(error, "Erreur lors de l'ajout de l'utilisateur.");
//       }
//     },

//     // Mettre à jour un utilisateur
//     async updateUtilisateur(utilisateur) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.put(`/users/${utilisateur.id}`, utilisateur, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const index = this.utilisateurs.findIndex((u) => u.id === utilisateur.id);
//         if (index !== -1) {
//           this.utilisateurs[index] = utilisateur; // Mettre à jour l'utilisateur
//           this.utilisateurs.sort((a, b) => a.id - b.id); // Trier après mise à jour
//         }
//         Swal.fire("Succès", "Utilisateur mis à jour avec succès.", "success");
//       } catch (error) {
//         this.handleError(error, "Erreur lors de la mise à jour de l'utilisateur.");
//       }
//     },

//     // Supprimer un utilisateur
//     async deleteUtilisateur(id) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.delete(`/users/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         this.utilisateurs = this.utilisateurs.filter((utilisateur) => utilisateur.id !== id);
//         Swal.fire("Succès", "Utilisateur supprimé avec succès.", "success");
//       } catch (error) {
//         const errorMessage = error.response?.data?.message;

//         if (errorMessage && errorMessage.includes("factures associées")) {
//           Swal.fire(
//             "Impossible de supprimer",
//             "Cet utilisateur ne peut pas être supprimé car il a des factures associées.",
//             "error"
//           );
//         } else if (errorMessage && errorMessage.includes("paiements associés")) {
//           Swal.fire(
//             "Impossible de supprimer",
//             "Cet utilisateur ne peut pas être supprimé car il a des paiements associés.",
//             "error"
//           );
//         } else {
//           this.handleError(error, "Impossible de supprimer cet utilisateur.");
//         }
//       }
//     },

//     // Récupérer un utilisateur par ID
//     async getUtilisateurById(id) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`/users/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data.data; // Renvoie les données de l'utilisateur
//       } catch (error) {
//         this.handleError(error, "Erreur lors de la récupération de l'utilisateur.");
//         throw error;
//       }
//     },

//     // Méthode pour gérer les erreurs globales
//     handleError(error, defaultMessage) {
//       if (error.response?.data?.errors) {
//         // Afficher les erreurs de validation sous forme de liste
//         const errorMessages = error.response.data.errors
//           .map((err) => `- ${err.msg}`)
//           .join("<br>");
//         Swal.fire({
//           title: "Erreur de validation",
//           html: errorMessages,
//           icon: "error",
//         });
//       } else if (error.response?.data?.message) {
//         // Afficher le message d'erreur du backend
//         Swal.fire("Erreur", error.response.data.message, "error");
//       } else {
//         // Afficher un message d'erreur par défaut
//         Swal.fire("Erreur", defaultMessage, "error");
//       }
//     },
//   },
// });
// src/stores/utilisateurStore.js

// src/stores/utilisateurStore.js

import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Session expirée",
          text: "Veuillez vous reconnecter.",
          icon: "warning",
        }).then(() => {
          window.location.href = "/login";
        });
      } else if (error.response.status === 403) {
        Swal.fire({
          title: "Accès interdit",
          text: "Vous n'avez pas les autorisations nécessaires.",
          icon: "error",
        });
      }
    }
    return Promise.reject(error);
  }
);

export const useUtilisateurStore = defineStore("utilisateurStore", {
  state: () => ({
    utilisateurs: [], 
  }),

  actions: {
    async loadDataFromApi() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.utilisateurs = response.data.data.sort((a, b) => a.id - b.id); 
      } catch (error) {
        this.handleError(error, "Erreur lors du chargement des utilisateurs.");
      }
    },
    async addUtilisateur(utilisateur) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("/users", utilisateur, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.utilisateurs.push(response.data.data); 
        this.utilisateurs.sort((a, b) => a.id - b.id);
        Swal.fire("Succès", "Utilisateur ajouté avec succès.", "success");
      } catch (error) {
        this.handleError(error, "Erreur lors de l'ajout de l'utilisateur.");
      }
    },
    async updateUtilisateur(utilisateur) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`/users/${utilisateur.id}`, utilisateur, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const index = this.utilisateurs.findIndex((u) => u.id === utilisateur.id);
        if (index !== -1) {
          this.utilisateurs[index] = utilisateur; 
          this.utilisateurs.sort((a, b) => a.id - b.id); 
        }
        Swal.fire("Succès", "Utilisateur mis à jour avec succès.", "success");
      } catch (error) {
        this.handleError(error, "Erreur lors de la mise à jour de l'utilisateur.");
      }
    },

    // Supprimer un utilisateur
    async deleteUtilisateur(id) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.utilisateurs = this.utilisateurs.filter((utilisateur) => utilisateur.id !== id);
        Swal.fire("Succès", "Utilisateur supprimé avec succès.", "success");
      } catch (error) {
        const errorMessage = error.response?.data?.message;

        if (errorMessage && errorMessage.includes("factures associées")) {
          Swal.fire(
            "Impossible de supprimer",
            "Cet utilisateur ne peut pas être supprimé car il a des factures associées.",
            "error"
          );
        } else if (errorMessage && errorMessage.includes("paiements associés")) {
          Swal.fire(
            "Impossible de supprimer",
            "Cet utilisateur ne peut pas être supprimé car il a des paiements associés.",
            "error"
          );
        } else {
          this.handleError(error, "Impossible de supprimer cet utilisateur.");
        }
      }
    },

    // Récupérer un utilisateur par ID
    async getUtilisateurById(id) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data; // Renvoie les données de l'utilisateur
      } catch (error) {
        this.handleError(error, "Erreur lors de la récupération de l'utilisateur.");
        throw error;
      }
    },

    // Mettre à jour le statut d'un utilisateur
    async updateStatut(id, statut) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(`/users/${id}/statut`, { statut }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Mettre à jour le statut dans la liste locale
        const index = this.utilisateurs.findIndex((u) => u.id === id);
        if (index !== -1) {
          this.utilisateurs[index].statut = statut;
        }

        Swal.fire("Succès", `Statut de l'utilisateur mis à jour en ${statut}.`, "success");
      } catch (error) {
        this.handleError(error, "Erreur lors de la mise à jour du statut de l'utilisateur.");
      }
    },
    

    // Méthode pour gérer les erreurs globales
    handleError(error, defaultMessage) {
      if (error.response?.data?.errors) {
        // Afficher les erreurs de validation sous forme de liste
        const errorMessages = error.response.data.errors
          .map((err) => `- ${err.msg}`)
          .join("<br>");
        Swal.fire({
          title: "Erreur de validation",
          html: errorMessages,
          icon: "error",
        });
      } else if (error.response?.data?.message) {
        // Afficher le message d'erreur du backend
        Swal.fire("Erreur", error.response.data.message, "error");
      } else {
        // Afficher un message d'erreur par défaut
        Swal.fire("Erreur", defaultMessage, "error");
      }
    },
  },
});