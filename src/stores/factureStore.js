import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useFactureStore = defineStore("factureStore", {
  state: () => ({
    factures: [],
    alerts: [],
    userRole: localStorage.getItem('role'), 
  }),
  actions: {
    async loadDataFromApi() {
      try {
        const response = await axios.get("/factures");
        const factures = response.data.data;
    
        for (let facture of factures) {
          if (!facture.client && facture.id_client) {
            const clientResponse = await axios.get(`/clients/${facture.id_client}`);
            facture.client = clientResponse.data.data;
          }
        }
    
        this.factures = factures.sort((a, b) => a.id - b.id);
        this.checkDueDates();
    
        return this.factures; 
      } catch (error) {
        Swal.fire("Erreur", "Erreur lors du chargement des factures.", "error");
        return []; 
      }
    },
    checkDueDates() {
      const today = new Date().toISOString().split("T")[0];
      this.alerts = []; 

      this.factures.forEach((facture) => {
        const dateEcheance = facture.date_echeance.split("T")[0];
        if (dateEcheance <= today && facture.pourcentage_paiement < 100) {
          this.alerts.push({
            factureId: facture.id,
            message: `La facture ${facture.id} pour ${facture.client?.nom || "inconnu"} arrive à échéance ou est en retard.`,
          });
        }
      });
    },
    async addFacture(facture) {
      try {
        if (facture.quantite <= 0) {
          Swal.fire("Erreur", "La quantité doit être un entier positif!", "error");
          return;
        }

        if (facture.prix_unitaire <= 0) {
          Swal.fire("Erreur", "Le prix unitaire doit être un nombre positif!", "error");
          return;
        }

        const response = await axios.post("/factures", facture);
        if (response.status === 201 || response.status === 200) {
          this.factures.push(response.data.data);
          this.factures.sort((a, b) => a.id - b.id);
          Swal.fire("Succès", "Facture ajoutée avec succès!", "success");
          this.checkDueDates();
        } else {
          Swal.fire("Erreur", "Erreur inattendue lors de l'ajout de la facture.", "error");
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          const errorMessages = error.response.data.errors
            .map((err) => `- ${err.msg}`)
            .join("<br>");
          Swal.fire({
            title: "Erreur de validation",
            html: errorMessages,
            icon: "error",
          });
        } else {
          Swal.fire(
            "Erreur",
            error.response?.data?.message || "Erreur lors de l'ajout de la facture.",
            "error"
          );
        }
      }
    },
    async updateFacture(updatedFacture) {
      try {
        // Validation locale avant d'envoyer les données
        if (updatedFacture.quantite <= 0) {
          Swal.fire("Erreur", "La quantité doit être un entier positif!", "error");
          return;
        }

        if (updatedFacture.prix_unitaire <= 0) {
          Swal.fire("Erreur", "Le prix unitaire doit être un nombre positif!", "error");
          return;
        }

        const existingFacture = this.factures.find((f) => f.id === updatedFacture.id);
        if (existingFacture && existingFacture.pourcentage_paiement > 0) {
          Swal.fire(
            "Modification impossible",
            "Cette facture a déjà reçu des paiements et ne peut pas être modifiée.",
            "warning"
          );
          return;
        }

        // Mise à jour via l'API
        const response = await axios.put(`/factures/${updatedFacture.id}`, updatedFacture);
        const index = this.factures.findIndex((f) => f.id === updatedFacture.id);

        if (index !== -1) {
          this.factures[index] = { ...updatedFacture, id: updatedFacture.id };
          this.factures.sort((a, b) => a.id - b.id);
        }
        Swal.fire("Succès", "Facture mise à jour avec succès!", "success");
      } catch (error) {
        if (error.response?.data?.errors) {
          const errorMessages = error.response.data.errors
            .map((err) => `- ${err.msg}`)
            .join("<br>");
          Swal.fire({
            title: "Erreur de validation",
            html: errorMessages,
            icon: "error",
          });
        } else {
          Swal.fire(
            "Erreur",
            error.response?.data?.message || "Erreur lors de la mise à jour de la facture.",
            "error"
          );
        }
      }
    },
    async deleteFacture(id) {
      const facture = this.factures.find(f => f.id === id);
      if (facture && facture.pourcentage_paiement > 0) {
        Swal.fire(
          "Impossible de supprimer",
          "Cette facture a déjà reçu des paiements et ne peut pas être supprimée.",
          "error"
        );
        return;
      }
    
      try {
        const response = await axios.delete(`/factures/${id}`);
        if (response.status === 200 || response.status === 204) {
          this.factures = this.factures.filter((f) => f.id !== id);
          this.factures.sort((a, b) => a.id - b.id);
          Swal.fire("Succès", "Facture supprimée avec succès!", "success");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la facture :", error);
    
        const errorMessage = error.response?.data?.message || "";
        
        if (errorMessage.toLowerCase().includes("paiement")) {
          Swal.fire(
            "Impossible de supprimer",
            "Cette facture ne peut pas être supprimée car elle est associée à des paiements.",
            "error"
          );
        } else {
          Swal.fire(
            "Erreur",
            errorMessage || "Impossible de supprimer cette facture. Veuillez réessayer plus tard.",
            "error"
          );
        }
      }
    },
    
    async getFactureById(id) {
      try {
        const response = await axios.get(`/factures/${id}`);
        const facture = response.data.data;
        if (!facture.client && facture.id_client) {
          const clientResponse = await axios.get(`/clients/${facture.id_client}`);
          facture.client = clientResponse.data.data;
        }

        return facture;
      } catch (error) {
        console.error("Erreur lors de la récupération de la facture :", error);
        throw error;
      }
    },
  },
});
