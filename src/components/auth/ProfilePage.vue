<!-- <template>
    <div class="profile-page">
      <div class="profile-container">
        <div class="profile-image">
          <img :src="user.profileImage || defaultImage" alt="Profile Image" class="profile-pic" />
          <label for="file-upload" class="upload-btn">
            <i class="fas fa-camera"></i>
          </label>
          <input type="file" id="file-upload" @change="handleImageChange" />
        </div>
          <h2 class="profile-title">Mon Profil</h2>
        <p class="role">{{ user.role.toUpperCase() }}</p>
          <form @submit.prevent="saveProfile" class="profile-form">
          <div class="input-group">
            <label>Nom :</label>
            <input v-model="user.nom" type="text" placeholder="Nom" />
          </div>
          <div class="input-group">
            <label>Email :</label>
            <input v-model="user.email" type="email" placeholder="Email" />
          </div>
          <div class="input-group">
            <label>Statut :</label>
            <select v-model="user.statut">
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          <div class="button-group">
            <button type="submit" class="btn btn-save">
              <i class="fas fa-save"></i> Enregistrer
            </button>
            <button type="button" @click="logout" class="btn btn-logout">
              <i class="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  const user = reactive({
    nom: '',
    email: '',
    role: '',
    statut: '',
    profileImage: '',
  });
  const defaultImage = 'https://via.placeholder.com/150';
  
  onMounted(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:4000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data && response.data.user) {
        user.nom = response.data.user.nom;
        user.email = response.data.user.email;
        user.role = response.data.user.role;
        user.statut = response.data.user.statut;
      } else {
        console.error("Données utilisateur introuvables.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      router.push('/login');
    }
  });
  
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
  
      const response = await axios.put('http://localhost:4000/api/users/update', user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  </script> -->
  <template>
    <div class="profile-page">
      <div class="profile-container">
        <!-- Image de profil -->
        <div class="profile-image">
          <img :src="user.profileImage || defaultImage" alt="Profile Image" class="profile-pic" />
          <label for="file-upload" class="upload-btn">
            <i class="fas fa-camera"></i>
          </label>
          <input type="file" id="file-upload" @change="handleImageChange" />
        </div>
  
        <!-- Titre -->
        <h2 class="profile-title">Mon Profil</h2>
        <p class="role">{{ user.role.toUpperCase() }}</p>
  
        <!-- Formulaire -->
        <form @submit.prevent="saveProfile" class="profile-form">
          <div class="input-group">
            <label>Nom :</label>
            <input v-model="user.nom" type="text" placeholder="Nom" />
          </div>
          <div class="input-group">
            <label>Email :</label>
            <input v-model="user.email" type="email" placeholder="Email" />
          </div>
          <div class="button-group">
            <button type="submit" class="btn btn-save">
              <i class="fas fa-save"></i> Enregistrer
            </button>
            <button type="button" @click="logout" class="btn btn-logout">
              <i class="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  const user = reactive({
    nom: '',
    email: '',
    role: '',
    profileImage: '',
  });
  const defaultImage = 'https://via.placeholder.com/150'; // Image de profil par défaut
  
  // Récupérer les données utilisateur
  onMounted(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:4000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data && response.data.user) {
        user.nom = response.data.user.nom;
        user.email = response.data.user.email;
        user.role = response.data.user.role;
      } else {
        console.error("Données utilisateur introuvables.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      router.push('/login');
    }
  });
  
  // Sauvegarder les données utilisateur
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
  
      const response = await axios.put(
        'http://localhost:4000/profile',
        { nom: user.nom, email: user.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("Profil mis à jour avec succès:", response.data);
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      alert("Une erreur est survenue lors de la mise à jour du profil.");
    }
  };
  
  // Gérer l'image de profil
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  </script>
  <style scoped>
  .profile-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #fffffa; /* Beige clair */
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
  }
  
  .profile-pic {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 3px solid #218838;
  }
  
  .upload-btn {
    position: absolute;
    bottom: 0;
    right: 10px;
    background-color: #218838;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .upload-btn:hover {
    background-color: #1e7e34;
  }
  
  #file-upload {
    display: none;
  }
  
  .profile-title {
    font-size: 1.8rem;
    color: #218838;
    margin-bottom: 5px;
  }
  
  .role {
    font-size: 1rem;
    color: gray;
    margin-bottom: 20px;
  }
  
  .profile-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
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
  
  input, select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100%;
    font-size: 1rem;
  }
  
  input:focus, select:focus {
    border-color: #218838;
    outline: none;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  
  button {
    padding: 10px 15px;
    background-color: #218838;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  button:hover {
    background-color: #1e7e34;
  }
  
  .btn-logout {
    background-color: #e3342f;
  }
  
  .btn-logout:hover {
    background-color: #cc1f1a;
  }
  </style>
  