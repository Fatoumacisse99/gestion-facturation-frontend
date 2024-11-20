
# FacturationApp - Frontend

Bienvenue dans **FacturationApp**, une application conçue pour simplifier la gestion des factures, des paiements, des clients et des utilisateurs. Ce README fournit une documentation complète pour mettre en place et utiliser l'application frontend.

Le frontend utilise **Vue.js**, avec **Axios** pour les requêtes API et **Bootstrap** pour le design.

---

## 📚 Table des Matières

1. [Description](#description)
2. [Fonctionnalités](#fonctionnalités)
   - [Gestion des Factures](#gestion-des-factures)
   - [Gestion des Paiements](#gestion-des-paiements)
   - [Gestion des Clients](#gestion-des-clients)
   - [Gestion des Utilisateurs](#gestion-des-utilisateurs)
3. [🎨 Technologies Utilisées](#technologies-utilisées)
4. [🔧 Prérequis](#prérequis)
5. [⚙️ Installation](#installation)
6. [🌐 Connexion avec le Backend](#connexion-avec-le-backend)
7. [📂 Structure du Projet](#structure-du-projet)
8. [✍️ Auteur](#auteur)

---

## 📝 Description

**FacturationApp** est une application frontend développée pour aider les petites et moyennes entreprises à gérer facilement leurs processus de facturation, les paiements et la gestion des clients.

### Objectifs :
- Suivi précis des paiements et des factures.
- Interface utilisateur intuitive.
- Alerte pour les factures en retard.
- Gestion centralisée des utilisateurs et rôles.

---

## ⚡ Fonctionnalités

### 📄 Gestion des Factures
- Ajouter, consulter, modifier et supprimer des factures.
- Ajouter des lignes de facture pour les produits/services.

### 💳 Gestion des Paiements
- Enregistrer les paiements complets ou partiels.
- Notifications pour les factures en retard.

### 👥 Gestion des Clients
- Créer, mettre à jour, et supprimer des clients.
- Consulter la liste des clients avec leurs informations détaillées.

### 🔐 Gestion des Utilisateurs
- Ajouter, modifier et gérer les rôles des utilisateurs.
- Afficher une liste de tous les utilisateurs.

---

## 🎨 Technologies Utilisées

- **Vue.js** (v3.x) - Framework JavaScript
- **Axios** - Gestion des requêtes API
- **Bootstrap** (v5.x) - Framework CSS
- **Vue Router** - Gestion des routes
- **Pinia** - Gestion d'état
- **Font Awesome** - Icônes pour un design moderne

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d’avoir les éléments suivants installés :

- **Node.js** (v14+)
- **npm** (fourni avec Node.js)

---

## ⚙️ Installation

### Étape 1 : Cloner le dépôt
```bash
git clone https://github.com/Fatoumacisse99/gestion-facturation-frontend.git
cd gestion-facturation-frontend
```

### Étape 2 : Installer les dépendances
```bash
npm install
```

### Étape 3 : Démarrer le projet
```bash
npm run dev
```

Accédez à l’application via [http://localhost:5173](http://localhost:5173).

---

## 🌐 Connexion avec le Backend

- **URL de base** : Toutes les requêtes API sont envoyées à l'URL suivante :
  ```
  http://localhost:4000/api
  ```
- Les tokens JWT sont utilisés pour l'authentification des requêtes. Ils sont ajoutés automatiquement via des intercepteurs Axios.

---

## 📂 Structure du Projet

```
src/
├── components/
│   ├── factures/
│   │   ├── ajoutFacture.vue
│   │   ├── modifieFacture.vue
│   │   ├── detailFacture.vue
│   │   └── listFacture.vue
│   ├── paiements/
│   │   ├── ajoutPaiement.vue
│   │   ├── modifiePaiement.vue
│   │   ├── detailPaiement.vue
│   │   └── listPaiement.vue
│   ├── clients/
│   │   ├── ajoutClient.vue
│   │   ├── modifieClient.vue
│   │   ├── detailClient.vue
│   │   └── listClient.vue
│   ├── utilisateurs/
│   │   ├── ajoutUtilisateur.vue
│   │   ├── modifieUtilisateur.vue
│   │   ├── detailUtilisateur.vue
│   │   └── listUtilisateur.vue
│   └── Navbar.vue
├── router/
│   └── index.js
├── stores/
│   ├── factureStore.js
│   ├── clientStore.js
│   ├── utilisateurStore.js
│   └── paiementStore.js
├── App.vue
├── main.js
└── style.css
```

---

## ✍️ Auteur

Développé par **Fatouma Cisse**  
[Profil GitHub](https://github.com/Fatoumacisse99)
