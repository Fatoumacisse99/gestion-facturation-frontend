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
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      Swal.fire({
        title: "Session expirée",
        text: "Veuillez vous reconnecter.",
        icon: "warning",
      }).then(() => {
        // Redirection vers la page de connexion
        window.location.href = "/login";
      });
    }
    return Promise.reject(error);
  }
);

export const useClientStore = defineStore("clients", {
  state: () => ({
    clients: [],
  }),

  actions: {
    async loadDataFromApi() {
      try {
        const response = await axios.get("/clients");
        this.clients = response.data.data;
      } catch (error) {
        Swal.fire("Erreur", "Erreur lors du chargement des clients.", "error");
      }
    },

    async addClient(client) {
      try {
        const response = await axios.post("/clients", client);
        this.clients.push(response.data.data); // Ajouter le nouveau client sans tri
        Swal.fire("Succès", "Client ajouté avec succès!", "success");
      } catch (error) {
        if (error.response && error.response.data.errors) {
          const errorMessages = error.response.data.errors
            .map((err) => `- ${err.msg}`)
            .join("<br>");
          Swal.fire({
            title: "Erreur de validation",
            html: errorMessages,
            icon: "error",
          });
        } else {
          Swal.fire("Erreur", error.response?.data.message || "Erreur lors de l'ajout du client.", "error");
        }
      }
    },

    async updateClient(updatedClient) {
      try {
        await axios.put(`/clients/${updatedClient.id}`, updatedClient);
        const index = this.clients.findIndex((c) => c.id === updatedClient.id);
        if (index !== -1) {
          this.clients[index] = { ...updatedClient }; // Mettre à jour les données sans modifier l'ordre
        }
        Swal.fire("Succès", "Client mis à jour avec succès!", "success");
      } catch (error) {
        if (error.response && error.response.data.errors) {
          const errorMessages = error.response.data.errors
            .map((err) => `- ${err.msg}`)
            .join("<br>");
          Swal.fire({
            title: "Erreur de validation",
            html: errorMessages,
            icon: "error",
          });
        } else {
          Swal.fire("Erreur", error.response?.data.message || "Erreur lors de la mise à jour du client.", "error");
        }
      }
    },

    async deleteClient(id) {
      try {
        const response = await axios.delete(`/clients/${id}`);
        if (response.status === 200 || response.status === 204) {
          this.clients = this.clients.filter((client) => client.id !== id);
          Swal.fire("Succès", "Client supprimé avec succès!", "success");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          Swal.fire("Accès refusé", "Seul un administrateur peut supprimer un client.", "error");
        } else if (error.response && error.response.data.message) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("factures associées")) {
            Swal.fire("Impossible de supprimer", "Ce client est associé à des factures.", "error");
          } else if (errorMessage.includes("paiements associés")) {
            Swal.fire("Impossible de supprimer", "Ce client est associé à des paiements.", "error");
          } else {
            Swal.fire("Erreur", "Impossible de supprimer ce client.", "error");
          }
        } else {
          Swal.fire("Erreur", "Erreur inattendue lors de la suppression.", "error");
        }
      }
    },

    async getClientById(id) {
      try {
        const response = await axios.get(`/clients/${id}`);
        return response.data.data;
      } catch (error) {
        console.error("Erreur lors de la récupération du client :", error);
        throw error;
      }
    },
  },
});
