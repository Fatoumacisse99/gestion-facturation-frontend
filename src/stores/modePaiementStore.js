// import { defineStore } from "pinia";
// import axios from "axios";
// import Swal from "sweetalert2";

// axios.defaults.baseURL = "http://localhost:4000/api";

// export const useModePaiementStore = defineStore("modePaiements", {
//   state: () => ({
//     modesPaiement: [], // Stockage des modes de paiement
//   }),

//   actions: {
//     async loadDataFromApi() {
//       try {
//         const response = await axios.get("/modes");
//         // Tri initial par ID
//         this.modesPaiement = response.data.data.sort((a, b) => a.id - b.id);
//       } catch (error) {
//         Swal.fire("Erreur", "Erreur lors du chargement des modes de paiement", "error");
//       }
//     },

//     async getModePaiementById(id) {
//       try {
//         const response = await axios.get(`/modes/${id}`);
//         return response.data.data;
//       } catch (error) {
//         Swal.fire("Erreur", "Erreur lors de la récupération du mode de paiement", "error");
//       }
//     },

//     async addModePaiement(modePaiement) {
//       try {
//         const existing = this.modesPaiement.find(m => m.libelle === modePaiement.libelle);
//         if (existing) {
//           Swal.fire("Erreur", "Ce libellé existe déjà", "error");
//           return;
//         }
//         const response = await axios.post("/modes", modePaiement);
//         this.modesPaiement.push(response.data.data);
//         // Tri par ID après ajout pour maintenir l'ordre
//         this.modesPaiement.sort((a, b) => a.id - b.id);
//         Swal.fire("Succès", "Mode de paiement ajouté avec succès", "success");
//       } catch (error) {
//         Swal.fire("Erreur", "Erreur lors de l'ajout du mode de paiement", "error");
//       }
//     },

//     async updateModePaiement(modePaiement) {
//       try {
//         const existing = this.modesPaiement.find(m => m.libelle === modePaiement.libelle && m.id !== modePaiement.id);
//         if (existing) {
//           Swal.fire("Erreur", "Ce libellé existe déjà", "error");
//           return;
//         }
//         await axios.put(`/modes/${modePaiement.id}`, modePaiement);
//         const index = this.modesPaiement.findIndex(m => m.id === modePaiement.id);
//         if (index !== -1) {
//           this.modesPaiement[index] = modePaiement;
//           // Tri par ID après mise à jour pour maintenir l'ordre
//           this.modesPaiement.sort((a, b) => a.id - b.id);
//         }
//         Swal.fire("Succès", "Mode de paiement mis à jour avec succès", "success");
//       } catch (error) {
//         Swal.fire("Erreur", "Erreur lors de la mise à jour du mode de paiement", "error");
//       }
//     },

//     async deleteModePaiement(id) {
//       try {
//         await axios.delete(`/modes/${id}`);
//         this.modesPaiement = this.modesPaiement.filter(mode => mode.id !== id);
//         Swal.fire("Succès", "Mode de paiement supprimé avec succès", "success");
//       } catch (error) {
//         console.error("Erreur lors de la suppression du mode de paiement :", error);

//         const errorMessage = error.response?.data.message || "Erreur lors de la suppression du mode de paiement.";
        
//         if (errorMessage.includes("associé à des paiements")) {
//           Swal.fire("Impossible de supprimer", "Ce mode de paiement ne peut pas être supprimé car il est associé à des paiements existants.", "error");
//         } else {
//           Swal.fire("Erreur", errorMessage, "error");
//         }
//       }
//     },
//   },
// });

import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://localhost:4000/api";

// Ajouter un intercepteur pour inclure le token JWT dans toutes les requêtes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Récupérer le token depuis le localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajouter le token à l'en-tête Authorization
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Ajouter un intercepteur pour gérer les erreurs 401 (non authentifié) et 403 (non autorisé)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      Swal.fire({
        title: "Session expirée",
        text: "Veuillez vous reconnecter.",
        icon: "warning",
      }).then(() => {
        // Rediriger vers la page de connexion
        window.location.href = "/login";
      });
    }
    return Promise.reject(error);
  }
);

export const useModePaiementStore = defineStore("modePaiements", {
  state: () => ({
    modesPaiement: [], // Stockage des modes de paiement
  }),

  actions: {
    // Charger les modes de paiement depuis l'API
    async loadDataFromApi() {
      try {
        const response = await axios.get("/modes");
        this.modesPaiement = response.data.data.sort((a, b) => a.id - b.id); // Trier par ID
      } catch (error) {
        Swal.fire("Erreur", "Erreur lors du chargement des modes de paiement", "error");
      }
    },

    // Récupérer un mode de paiement par ID
    async getModePaiementById(id) {
      try {
        const response = await axios.get(`/modes/${id}`);
        return response.data.data;
      } catch (error) {
        Swal.fire("Erreur", "Erreur lors de la récupération du mode de paiement", "error");
      }
    },

    // Ajouter un mode de paiement
    async addModePaiement(modePaiement) {
      try {
        // Vérifier si le libellé existe déjà localement
        const existing = this.modesPaiement.find((m) => m.libelle === modePaiement.libelle);
        if (existing) {
          Swal.fire("Erreur", "Ce libellé existe déjà", "error");
          return;
        }

        // Envoyer une requête pour ajouter le mode de paiement
        const response = await axios.post("/modes", modePaiement);
        this.modesPaiement.push(response.data.data);

        // Trier par ID après ajout pour maintenir l'ordre
        this.modesPaiement.sort((a, b) => a.id - b.id);

        Swal.fire("Succès", "Mode de paiement ajouté avec succès", "success");
      } catch (error) {
        if (error.response && error.response.data.errors) {
          // Gérer les erreurs de validation renvoyées par le backend
          const errorMessages = error.response.data.errors
            .map((err) => `- ${err.msg}`)
            .join("<br>");
          Swal.fire({
            title: "Erreur de validation",
            html: errorMessages,
            icon: "error",
          });
        } else {
          Swal.fire("Erreur", "Erreur lors de l'ajout du mode de paiement", "error");
        }
      }
    },

    // Mettre à jour un mode de paiement
    async updateModePaiement(modePaiement) {
      try {
        // Vérifier si un autre mode de paiement utilise le même libellé
        const existing = this.modesPaiement.find(
          (m) => m.libelle === modePaiement.libelle && m.id !== modePaiement.id
        );
        if (existing) {
          Swal.fire("Erreur", "Ce libellé existe déjà", "error");
          return;
        }

        // Envoyer une requête pour mettre à jour le mode de paiement
        await axios.put(`/modes/${modePaiement.id}`, modePaiement);

        // Mettre à jour localement
        const index = this.modesPaiement.findIndex((m) => m.id === modePaiement.id);
        if (index !== -1) {
          this.modesPaiement[index] = modePaiement;
          this.modesPaiement.sort((a, b) => a.id - b.id); // Trier après mise à jour
        }

        Swal.fire("Succès", "Mode de paiement mis à jour avec succès", "success");
      } catch (error) {
        if (error.response && error.response.data.errors) {
          // Gérer les erreurs de validation renvoyées par le backend
          const errorMessages = error.response.data.errors
            .map((err) => `- ${err.msg}`)
            .join("<br>");
          Swal.fire({
            title: "Erreur de validation",
            html: errorMessages,
            icon: "error",
          });
        } else {
          Swal.fire("Erreur", "Erreur lors de la mise à jour du mode de paiement", "error");
        }
      }
    },

    // Supprimer un mode de paiement
    async deleteModePaiement(id) {
      try {
        // Envoyer une requête pour supprimer le mode de paiement
        await axios.delete(`/modes/${id}`);

        // Supprimer localement
        this.modesPaiement = this.modesPaiement.filter((mode) => mode.id !== id);

        Swal.fire("Succès", "Mode de paiement supprimé avec succès", "success");
      } catch (error) {
        console.error("Erreur lors de la suppression du mode de paiement :", error);

        // Gérer les erreurs spécifiques renvoyées par le backend
        const errorMessage = error.response?.data.message || "Erreur lors de la suppression du mode de paiement.";
        if (errorMessage.includes("associé à des paiements")) {
          Swal.fire(
            "Impossible de supprimer",
            "Ce mode de paiement est associé à des paiements existants.",
            "error"
          );
        } else {
          Swal.fire("Erreur", errorMessage, "error");
        }
      }
    },
  },
});
