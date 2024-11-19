// import { defineStore } from "pinia";
// import axios from "axios";
// import Swal from "sweetalert2";

// axios.defaults.baseURL = "http://localhost:4000/api";

// export const usePaiementStore = defineStore("paiements", {
//   state: () => ({
//     paiements: [],
//   }),

//   actions: {
//     async loadDataFromApi() {
//       try {
//         const response = await axios.get("/paiements");
//         this.paiements = response.data.data;

//         await Promise.all(this.paiements.map(async (paiement) => {
//           if (paiement.id_facture) {
//             try {
//               const factureResponse = await axios.get(`/factures/${paiement.id_facture}`);
//               paiement.facture = factureResponse.data.data;
//               console.log(`Facture chargée pour paiement ID ${paiement.id}:`, paiement.facture);
//             } catch (error) {
//               console.error(`Erreur lors du chargement de la facture pour paiement ID ${paiement.id}`, error);
//               paiement.facture = { id: "Non défini" };
//             }
//           }
      
//           if (paiement.id_mode_paiement) {
//             console.log(`Chargement du mode de paiement avec ID ${paiement.id_mode_paiement} pour le paiement ID ${paiement.id}`);
//             try {
//                 const modePaiementResponse = await axios.get(`/modes/${paiement.id_mode_paiement}`);
//                 paiement.modePaiement = modePaiementResponse.data.data;
//                 console.log(`Mode de paiement chargé pour paiement ID ${paiement.id}:`, paiement.modePaiement);
//             } catch (error) {
//                 if (error.response && error.response.status === 404) {
//                     console.warn(`Mode de paiement introuvable pour paiement ID ${paiement.id}`);
//                     paiement.modePaiement = { libelle: "Non défini" };
//                 } else {
//                     console.error(`Erreur lors du chargement du mode de paiement pour paiement ID ${paiement.id}`, error);
//                 }
//             }
//         } else {
//             paiement.modePaiement = { libelle: "Non défini" };
//         }
//         }));
        
        
//       } catch (error) {
//         console.error("Erreur lors du chargement des paiements :", error);
//         Swal.fire("Erreur", "Erreur lors du chargement des paiements.", "error");
//       }
//     },

//     async getPaiementById(id) {
//       try {
//         const response = await axios.get(`/paiements/${id}`);
//         return response.data.data;
//       } catch (error) {
//         Swal.fire("Erreur", "Erreur lors de la récupération du paiement.", "error");
//       }
//     },

//     async addPaiement(paiement) {
//   try {
//     const response = await axios.post("/paiements", paiement);
//     this.paiements.push(response.data.data);
//     Swal.fire("Succès", "Paiement ajouté avec succès", "success");
//   } catch (error) {
//     if (error.response && error.response.data.errors) {
//       const errorMessages = error.response.data.errors
//         .map((err) => `- ${err.msg}`)
//         .join("<br>");
//       Swal.fire({
//         title: "Erreur de validation",
//         html: errorMessages,
//         icon: "error",
//       });
//     } else {
//       Swal.fire("Erreur", error.response?.data.message || "Erreur lors de l'ajout du paiement.", "error");
//     }
//   }
// },

//     async updatePaiement(paiement) {
//       try {
//         const response = await axios.put(`/paiements/${paiement.id}`, paiement);
//         const index = this.paiements.findIndex(p => p.id === paiement.id);
//         if (index !== -1) {
//           this.paiements[index] = response.data.data;
//         }
//         Swal.fire("Succès", "Paiement mis à jour avec succès", "success");
//       } catch (error) {
//         Swal.fire("Erreur", "Erreur lors de la mise à jour du paiement.", "error");
//       }
//     },

//     async deletePaiement(id) {
//       try {
//         const response = await axios.delete(`/paiements/${id}`);
        
//         if (response.status === 200 || response.status === 204) {
//           this.paiements = this.paiements.filter(paiement => paiement.id !== id);
//         } else {
//           throw new Error("Erreur lors de la suppression du paiement.");
//         }
//       } catch (error) {
//         const errorMessage = error.response?.data.message || "Erreur lors de la suppression du paiement.";
//         throw new Error(errorMessage); 
//       }
//     },
    
//   }
// });
import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://localhost:4000/api";

// Ajouter un interceptor pour inclure le token JWT dans les en-têtes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Récupérer le token depuis le localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Ajouter un interceptor pour gérer les erreurs 401 et 403
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
          // Redirection vers la page de connexion
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

export const usePaiementStore = defineStore("paiements", {
  state: () => ({
    paiements: [],
  }),

  actions: {
    // Charger tous les paiements
    async loadDataFromApi() {
      try {
        const response = await axios.get("/paiements");
        this.paiements = response.data.data;

        await Promise.all(
          this.paiements.map(async (paiement) => {
            // Charger la facture liée au paiement
            if (paiement.id_facture) {
              try {
                const factureResponse = await axios.get(`/factures/${paiement.id_facture}`);
                paiement.facture = factureResponse.data.data;
                console.log(`Facture chargée pour paiement ID ${paiement.id}:`, paiement.facture);
              } catch (error) {
                console.error(`Erreur lors du chargement de la facture pour paiement ID ${paiement.id}`, error);
                paiement.facture = { id: "Non défini" };
              }
            }

            // Charger le mode de paiement lié
            if (paiement.id_mode_paiement) {
              try {
                const modePaiementResponse = await axios.get(`/modes/${paiement.id_mode_paiement}`);
                paiement.modePaiement = modePaiementResponse.data.data;
                console.log(`Mode de paiement chargé pour paiement ID ${paiement.id}:`, paiement.modePaiement);
              } catch (error) {
                if (error.response && error.response.status === 404) {
                  console.warn(`Mode de paiement introuvable pour paiement ID ${paiement.id}`);
                  paiement.modePaiement = { libelle: "Non défini" };
                } else {
                  console.error(`Erreur lors du chargement du mode de paiement pour paiement ID ${paiement.id}`, error);
                }
              }
            } else {
              paiement.modePaiement = { libelle: "Non défini" };
            }
          })
        );
      } catch (error) {
        console.error("Erreur lors du chargement des paiements :", error);
        Swal.fire("Erreur", "Erreur lors du chargement des paiements.", "error");
      }
    },

    // Récupérer un paiement par ID
    async getPaiementById(id) {
      try {
        const response = await axios.get(`/paiements/${id}`);
        return response.data.data;
      } catch (error) {
        console.error("Erreur lors de la récupération du paiement :", error);
        Swal.fire("Erreur", "Erreur lors de la récupération du paiement.", "error");
      }
    },

    // Ajouter un paiement
    async addPaiement(paiement) {
      try {
        const response = await axios.post("/paiements", paiement);
        this.paiements.push(response.data.data);
        Swal.fire("Succès", "Paiement ajouté avec succès", "success");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire("Erreur", "Authentification requise. Veuillez vous connecter.", "error");
          } else if (error.response.status === 403) {
            Swal.fire("Erreur", "Vous n'avez pas les autorisations nécessaires.", "error");
          } else if (error.response.data.errors) {
            // Gestion des erreurs de validation
            const errorMessages = error.response.data.errors
              .map((err) => `- ${err.msg}`)
              .join("<br>");
            Swal.fire({
              title: "Erreur de validation",
              html: errorMessages,
              icon: "error",
            });
          } else {
            Swal.fire("Erreur", error.response.data.message || "Erreur lors de l'ajout du paiement.", "error");
          }
        } else {
          Swal.fire("Erreur", "Impossible de se connecter au serveur.", "error");
        }
      }
    },

    // Mettre à jour un paiement
    async updatePaiement(paiement) {
      try {
        const response = await axios.put(`/paiements/${paiement.id}`, paiement);
        const index = this.paiements.findIndex((p) => p.id === paiement.id);
        if (index !== -1) {
          this.paiements[index] = response.data.data;
        }
        Swal.fire("Succès", "Paiement mis à jour avec succès", "success");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire("Erreur", "Authentification requise. Veuillez vous connecter.", "error");
          } else if (error.response.status === 403) {
            Swal.fire("Erreur", "Vous n'avez pas les autorisations nécessaires.", "error");
          } else {
            Swal.fire("Erreur", "Erreur lors de la mise à jour du paiement.", "error");
          }
        } else {
          Swal.fire("Erreur", "Impossible de se connecter au serveur.", "error");
        }
      }
    },

    // Supprimer un paiement
    async deletePaiement(id) {
      try {
        const response = await axios.delete(`/paiements/${id}`);
        if (response.status === 200 || response.status === 204) {
          this.paiements = this.paiements.filter((paiement) => paiement.id !== id);
          Swal.fire("Succès", "Paiement supprimé avec succès", "success");
        } else {
          throw new Error("Erreur lors de la suppression du paiement.");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire("Erreur", "Authentification requise. Veuillez vous connecter.", "error");
          } else if (error.response.status === 403) {
            Swal.fire("Accès interdit", "Vous n'êtes pas autorisé à supprimer ce paiement.", "error");
          } else {
            Swal.fire("Erreur", error.response.data.message || "Erreur lors de la suppression du paiement.", "error");
          }
        } else {
          Swal.fire("Erreur", "Impossible de se connecter au serveur.", "error");
        }
      }
    },
  },
});
