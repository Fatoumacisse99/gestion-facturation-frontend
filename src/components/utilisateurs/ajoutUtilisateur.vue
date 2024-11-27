<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center mb-3 p-3">
      <h2 class="title">Ajouter un nouvel utilisateur</h2>
    </div>
    <form @submit.prevent="ajouterUtilisateur" class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nom:</label>
          <input v-model="utilisateur.nom" required class="form-control form-control-sm" />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Email:</label>
          <input v-model="utilisateur.email" required type="email" class="form-control form-control-sm" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3 position-relative">
          <label class="form-label">Mot de passe:</label>
          <input
            v-model="utilisateur.mot_de_passe"
            :type="showPassword ? 'text' : 'password'"
            required
            class="form-control form-control-sm"
          />
          <i
            :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
            class="password-toggle-icon"
            @click="togglePassword"
            aria-label="Afficher/Masquer le mot de passe"
            title="Afficher/Masquer le mot de passe"
          ></i>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Rôle:</label>
          <select v-model="utilisateur.role" required class="form-control form-control-sm">
            <option value="ADMIN">ADMIN</option>
            <option value="COMPTABLE">COMPTABLE</option>
          </select>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Statut:</label>
          <select v-model="utilisateur.statut" required class="form-control form-control-sm">
            <option :value="true">Actif</option>
            <option :value="false">Inactif</option>
          </select>
        </div>
      </div> -->
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">Enregistrer</button>
        <button type="button" @click="annuler" class="btn btn-cancel flex-grow-1">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useUtilisateurStore } from "@/stores/utilisateurStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const utilisateurStore = useUtilisateurStore();
const router = useRouter();
const utilisateur = ref({ nom: "", email: "", mot_de_passe: "", role: "COMPTABLE", statut: "actif" });  // Rôle et statut par défaut

// Propriété réactive pour gérer la visibilité du mot de passe
const showPassword = ref(false);

// Méthode pour basculer la visibilité du mot de passe
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const ajouterUtilisateur = async () => {
  try {
    await utilisateurStore.addUtilisateur(utilisateur.value);
    router.push("/utilisateurs");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    // Vous pouvez également ajouter une notification d'erreur ici
  }
};

const annuler = () => {
  router.push("/utilisateurs");
};
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

/* Styles pour l'icône d'œil */
.password-toggle-icon {
  position: absolute;
  top:  75%;
  right: 15px; /* Ajustez cette valeur si nécessaire */
  transform: translateY(-50%);
  cursor: pointer;
  color: #d4d8dc; /* Couleur de l'icône, ajustez selon vos besoins */
  
}
</style>





<!-- <template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center mb-3 p-3">
      <h2 class="title">Ajouter un nouvel utilisateur</h2>
    </div>
    <form @submit.prevent="validerEtEnvoyer" class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nom:</label>
          <input
            v-model="utilisateur.nom"
            class="form-control form-control-sm"
            @blur="validerChamp('nom')"
          />
          <span v-if="erreurs.nom" class="error">{{ erreurs.nom }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Email:</label>
          <input
            v-model="utilisateur.email"
            type="email"
            class="form-control form-control-sm"
            @blur="validerChamp('email')"
          />
          <span v-if="erreurs.email" class="error">{{ erreurs.email }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Mot de passe:</label>
          <input
            v-model="utilisateur.mot_de_passe"
            type="password"
            class="form-control form-control-sm"
            @blur="validerChamp('mot_de_passe')"
          />
          <span v-if="erreurs.mot_de_passe" class="error">{{ erreurs.mot_de_passe }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Rôle:</label>
          <select
            v-model="utilisateur.role"
            class="form-control form-control-sm"
            @blur="validerChamp('role')"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="COMPTABLE">COMPTABLE</option>
          </select>
          <span v-if="erreurs.role" class="error">{{ erreurs.role }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">Enregistrer</button>
        <button type="button" @click="annuler" class="btn btn-cancel flex-grow-1">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUtilisateurStore } from "@/stores/utilisateurStore";

const utilisateurStore = useUtilisateurStore();
const router = useRouter();

// Données utilisateur
const utilisateur = ref({
  nom: "",
  email: "",
  mot_de_passe: "",
  role: "COMPTABLE",
});

// Stocker les erreurs localement
const erreurs = ref({});

// Règles de validation locales
const reglesValidation = {
  nom: (val) =>
    !val
      ? "Le nom est requis!"
      : val.length > 50
      ? "Le nom ne doit pas dépasser 50 caractères!"
      : !/^[a-zA-ZÀ-ÿ\s]+$/.test(val)
      ? "Le nom doit contenir uniquement des lettres et des espaces!"
      : null,
  email: (val) =>
    !val
      ? "L'email est requis!"
      : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
      ? "L'email doit être valide!"
      : val.length > 100
      ? "L'email ne doit pas dépasser 100 caractères!"
      : null,
  mot_de_passe: (val) =>
    !val
      ? "Le mot de passe est requis!"
      : val.length < 6
      ? "Le mot de passe doit contenir au moins 6 caractères!"
      : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val)
      ? "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre!"
      : null,
  role: (val) =>
    val === "ADMIN" || val === "COMPTABLE"
      ? null
      : "Le rôle doit être soit 'ADMIN' soit 'COMPTABLE'.",
};

// Fonction pour valider un champ
const validerChamp = (champ) => {
  const valeur = utilisateur.value[champ];
  erreurs.value[champ] = reglesValidation[champ] ? reglesValidation[champ](valeur) : null;
};

// Fonction pour valider tout le formulaire
const validerFormulaire = () => {
  Object.keys(utilisateur.value).forEach(validerChamp);
  return !Object.values(erreurs.value).some((err) => err);
};

const validerEtEnvoyer = async () => {
  if (validerFormulaire()) {
    try {
      await utilisateurStore.addUtilisateur(utilisateur.value);
      router.push("/utilisateurs");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    }
  }
};

// Fonction pour annuler
const annuler = () => {
  router.push("/utilisateurs");
};
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

.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style> -->
