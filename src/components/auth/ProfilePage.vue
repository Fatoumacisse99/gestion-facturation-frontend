<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-image">
        <div
          v-if="!user.profileImage"
          class="profile-initial"
          :style="{ backgroundColor: randomColor }"
        >
          {{ getInitial(user.nom) }}
        </div>
        <img
          v-else
          :src="user.profileImage"
          alt="Profile Image"
          class="profile-pic"
        />
      </div>
      <div class="profile-header">
        <h2 class="profile-title">{{ user.nom || "Utilisateur" }}</h2>
        <p class="profile-email">{{ user.email }}</p>
        <button v-if="!isEditing" @click="toggleEditMode" class="btn-edit">
          Modifier
        </button>
      </div>
      <!-- Formulaire visible uniquement en mode édition -->
      <form v-if="isEditing" @submit.prevent="validateAndSaveProfile" class="profile-form">
        <div class="input-group">
          <label>Nom :</label>
          <input v-model="user.nom" type="text" placeholder="Nom" />
          <span v-if="errors.nom" class="error-message">{{ errors.nom }}</span>
        </div>
        <div class="input-group">
          <label>Email :</label>
          <input v-model="user.email" type="email" placeholder="Email" />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-save">Enregistrer</button>
          <button type="button" class="btn btn-cancel" @click="toggleEditMode">
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const user = reactive({
  nom: "",
  email: "",
  role: "",
  profileImage: "",
});
const errors = reactive({
  nom: "",
  email: "",
});
const isEditing = ref(false);
const randomColor = ref("#ddd");

onMounted(async () => {
  generateRandomColor();

  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }
  try {
    const response = await axios.get("http://localhost:4000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data && response.data.user) {
      user.nom = response.data.user.nom;
      user.email = response.data.user.email;
      user.role = response.data.user.role;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    router.push("/login");
  }
});

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
};

// Fonction pour valider le champ "nom"
const validateNom = () => {
  const nom = user.nom.trim();
  if (!nom) {
    errors.nom = "Le nom ne peut pas être vide!";
  } else if (nom.length > 50) {
    errors.nom = "Le nom ne doit pas dépasser 50 caractères!";
  } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nom)) {
    errors.nom = "Le nom doit contenir uniquement des lettres et des espaces!";
  } else {
    errors.nom = "";
  }
};

// Fonction pour valider le champ "email"
const validateEmail = () => {
  const email = user.email.trim();
  if (!email) {
    errors.email = "L'email est requis!";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "L'email doit être valide!";
  } else if (email.length > 100) {
    errors.email = "L'email ne doit pas dépasser 100 caractères!";
  } else {
    errors.email = "";
  }
};

// Valider et enregistrer le profil
const validateAndSaveProfile = async () => {
  validateNom();
  validateEmail();

  if (!errors.nom && !errors.email) {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:4000/profile",
        { nom: user.nom, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profil mis à jour avec succès !");
      isEditing.value = false;
    } catch (error) {
      alert("Erreur lors de la mise à jour du profil.");
    }
  }
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

const getInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : "?";
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  randomColor.value = color;
};
</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fffffa;
}
.profile-container {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}
.profile-image {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
}
.profile-pic {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid #218838;
}
.profile-initial {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
}
.profile-header {
  margin-bottom: 20px;
}
.profile-title {
  font-size: 1.8rem;
  color: #218838;
}
.profile-email {
  font-size: 1rem;
  color: gray;
  margin-bottom: 10px;
}
.btn-edit {
  background-color: transparent;
  color: #218838;
  border: 1px solid #218838;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-edit:hover {
  background-color: #218838;
  color: white;
}
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}
.input-group {
  text-align: left;
}
label {
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
  display: block;
}
input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  font-size: 1rem;
}
input:focus {
  border-color: #218838;
  outline: none;
}
.error-message {
  color: #e3342f;
  font-size: 0.9rem;
  margin-top: 5px;
}
.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}
button {
  padding: 10px 15px;
  background-color: #218838;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #1e7e34;
}
.btn-cancel {
  background-color: transparent;
  color: #e3342f;
  border: 2px solid #e3342f;
}
.btn-cancel:hover {
  background-color: #e3342f;
  color: white;
}
</style>
