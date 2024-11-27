   <template>
    <div class="auth-page">
      <div class="background-box"></div>
      <div class="auth-form">
        <h2 class="title">Changer <span class="highlight">le mot de passe</span></h2>
        
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label>Ancien mot de passe :</label>
            <div class="password-container">
              <input 
                :type="passwordVisible.old ? 'text' : 'password'" 
                class="form-control" 
                v-model="passwords.oldPassword" 
                placeholder="Ancien mot de passe"
                required
              />
              <i 
                class="toggle-password fa" 
                :class="passwordVisible.old ? 'fa-eye-slash' : 'fa-eye'" 
                @click="togglePasswordVisibility('old')"
              ></i>
            </div>
          </div>
    
          <div class="form-group">
            <label>Nouveau mot de passe :</label>
            <div class="password-container">
              <input 
                :type="passwordVisible.new ? 'text' : 'password'" 
                class="form-control" 
                v-model="passwords.newPassword" 
                placeholder="Nouveau mot de passe"
                required
              />
              <i 
                class="toggle-password fa" 
                :class="passwordVisible.new ? 'fa-eye-slash' : 'fa-eye'" 
                @click="togglePasswordVisibility('new')"
              ></i>
            </div>
          </div>
    
          <div class="form-group">
            <label>Confirmer le nouveau mot de passe :</label>
            <div class="password-container">
              <input 
                :type="passwordVisible.confirm ? 'text' : 'password'" 
                class="form-control" 
                v-model="passwords.confirmPassword" 
                placeholder="Confirmer le nouveau mot de passe"
                required
              />
              <i 
                class="toggle-password fa" 
                :class="passwordVisible.confirm ? 'fa-eye-slash' : 'fa-eye'" 
                @click="togglePasswordVisibility('confirm')"
              ></i>
            </div>
          </div>
    
          <button type="submit" class="btn btn-login">Valider</button>
          <router-link to="/profile" class="btn btn-cancel">Annuler</router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  
  // Données pour les mots de passe
  const passwords = reactive({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Gestion de la visibilité des champs mot de passe
  const passwordVisible = reactive({
    old: false,
    new: false,
    confirm: false,
  });
  
  // Fonction pour basculer la visibilité
  const togglePasswordVisibility = (field) => {
    passwordVisible[field] = !passwordVisible[field];
  };
  
  // Fonction pour changer le mot de passe
  const changePassword = async () => {
    // Validation frontend
    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      alert("Tous les champs sont obligatoires.");
      return;
    }
  
    if (passwords.newPassword.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
  
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(passwords.newPassword)) {
      alert("Le mot de passe doit contenir une majuscule, une minuscule et un chiffre.");
      return;
    }
  
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
  
    // Requête vers le backend
    try {
      const token = localStorage.getItem("token");
      console.log("Token envoyé :", token);
  
      const response = await axios.put(
        "http://localhost:4000/profile/change-password",
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Réponse du serveur :", response.data);
      alert("Mot de passe changé avec succès !");
      router.push("/profile");
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe :", error.response?.data || error.message);
      alert(error.response?.data?.message || "Erreur lors du changement de mot de passe.");
    }
  };
  </script>
  
  <style scoped>
  .auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f8f9fc;
    position: relative;
    padding: 20px;
  }
  
  .background-box {
    position: absolute;
    width: 480px;
    height: 490px;
    background: #218838;
    border-radius: 20px;
    transform: rotate(-6deg) translateY(-20px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 0;
  }
  
  .auth-form {
    background: white;
    border-radius: 20px;
    padding: 60px;
    max-width: 470px;
    height: 510px;
    width: 100%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    text-align: center;
    z-index: 1;
    position: relative;
  }
  
  .title {
    font-size: 1.8rem;
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .highlight {
    color: #1e7e34;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-control:focus {
    border-color: #218838;
    box-shadow: none;
  }
  
  .password-wrapper {
    position: relative;
  }
  
  .password-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #ccc;
  }
  
  .toggle-password:hover {
    color: #218838;
  }
  
  .btn-login {
    background-color: #218838;
    color: white;
    border: none;
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .btn-login:hover {
    background-color: #1e7e34;
  }
  
  .btn-cancel {
    display: block;
    margin-top: 10px;
    color: #e3342f;
    text-decoration: none;
    font-weight: bold;
  }
  
  .btn-cancel:hover {
    text-decoration: underline;
  }
  </style>
  