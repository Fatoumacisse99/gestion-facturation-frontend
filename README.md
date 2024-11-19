
# FacturationApp

## Table des Matières
1. [Description](#description)
2. [Fonctionnalités](#fonctionnalités)
   - [Gestion des Factures](#gestion-des-factures)
   - [Gestion des Lignes de Facture](#gestion-des-lignes-de-facture)
   - [Gestion des Paiements](#gestion-des-paiements)
   - [Gestion des Clients](#gestion-des-clients)
   - [Gestion des Utilisateurs](#gestion-des-utilisateurs)
   - [Gestion des Modes de Paiement](#gestion-des-modes-de-paiement)
3. [Technologies Utilisées](#technologies-utilisées)
4. [Prérequis](#prérequis)
5. [Installation](#installation)
6. [Structure du Projet](#structure-du-projet)
7. [Auteur](#auteur)

## Description

**FacturationApp** est une application développée pour simplifier la gestion des factures, des paiements, des clients, des utilisateurs et des modes de paiement dans les petites et moyennes entreprises (PME). Elle propose une interface intuitive permettant de gérer facilement les opérations de facturation, suivre les paiements et maintenir un historique client complet, tout en offrant une gestion centralisée des utilisateurs et des modes de paiement.

## Fonctionnalités

### Gestion des Factures
Cette fonctionnalité permet aux utilisateurs de créer, consulter, mettre à jour et supprimer des factures. Elle inclut l’ajout direct de lignes de facture pour détailler les articles ou services facturés.

- **Ajouter une facture** : Créer une nouvelle facture en renseignant le client, la date, le montant total, et les lignes de facture.
- **Modifier une facture** : Mettre à jour les informations d'une facture existante, y compris les lignes de facture.
- **Supprimer une facture** : Retirer une facture et ses lignes associées.
- **Consulter les détails d'une facture** : Afficher toutes les informations d'une facture, y compris les lignes de facture.
- **Liste des factures** : Visualiser toutes les factures enregistrées dans le système.

### Gestion des Lignes de Facture
Cette section permet d’ajouter, de modifier, et de supprimer des lignes de facture pour des articles ou services spécifiques, directement liés aux factures.

- **Ajouter une ligne de facture** : Ajouter des articles ou services avec prix et quantité à une facture.
- **Modifier une ligne de facture** : Ajuster les détails d'une ligne de facture.
- **Supprimer une ligne de facture** : Retirer une ligne spécifique d'une facture.

### Gestion des Paiements
L’application permet un suivi rigoureux des paiements, avec des fonctionnalités d’alerte pour les factures impayées ou en retard.

- **Enregistrer un paiement** : Enregistrer des paiements partiels ou complets, tout en suivant le montant dû.
- **Alertes de paiement** : Notifications pour les factures en retard de paiement.
- **Statut des paiements** : Visualiser l’état de chaque facture (payée, en attente, partiellement payée).

### Gestion des Clients
Le module client assure une gestion complète des informations des clients.

- **Ajouter un client** : Enregistrer un client avec ses coordonnées et informations spécifiques.
- **Modifier un client** : Mettre à jour les informations d'un client existant.
- **Supprimer un client** : Retirer un client si aucune facture en cours ne lui est associée.
- **Consulter les détails d'un client** : Afficher les informations d'un client particulier.
- **Liste des clients** : Voir la liste de tous les clients enregistrés.

### Gestion des Utilisateurs
Cette section est dédiée à la gestion des utilisateurs de l’application, permettant de gérer les rôles et accès.

- **Ajouter un utilisateur** : Ajouter un nouvel utilisateur avec des informations d’identification et de rôle.
- **Modifier un utilisateur** : Mettre à jour les informations d'un utilisateur.
- **Supprimer un utilisateur** : Supprimer un utilisateur, sous réserve qu'il n’ait pas de dépendances actives.
- **Liste des utilisateurs** : Afficher la liste de tous les utilisateurs avec leurs informations.

### Gestion des Modes de Paiement
L’application supporte différents modes de paiement configurables, pour adapter la facturation aux besoins de l’entreprise.

- **Ajouter un mode de paiement** : Enregistrer un nouveau mode de paiement (ex. : carte, virement).
- **Modifier un mode de paiement** : Mettre à jour les informations d'un mode de paiement existant.
- **Supprimer un mode de paiement** : Retirer un mode de paiement de la liste.
- **Liste des modes de paiement** : Afficher tous les modes de paiement disponibles.

## Technologies Utilisées

  - **[Vue.js](https://vuejs.org/)** - Framework JavaScript pour le frontend (v3.x)
  - **[Bootstrap](https://getbootstrap.com/)** - Framework CSS pour un design réactif (v5.x)
  - **[Font Awesome](https://fontawesome.com/)** - Bibliothèque d'icônes (v6.x)
  - **[Pinia](https://pinia.vuejs.org/)** - Gestion d'état centralisée (v2.x)
  - **[Vue Router](https://router.vuejs.org/)** - Gestion de la navigation (v4.x)
  - **[vue-i18n](https://kazupon.github.io/vue-i18n/)** - Internationalisation (v9.x)
  - **[Express.js](https://expressjs.com/)** - Framework backend pour l'API (v4.x)
  - **[Prisma](https://www.prisma.io/)** - ORM pour la gestion de la base de données (v4.x)
  - **[MySQL](https://www.mysql.com/)** - Base de données relationnelle (v8.x)

## Prérequis

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Installation

1. **Clonez le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/votre-projet.git
   ```

2. **Accédez au répertoire du projet :**

   ```bash
   cd votre-projet
   ```

3. **Installez les dépendances**

   ```bash
   npm install
   ```

4. **Configurez la base de données**

   - Créez une base de données MySQL.
   - Ajoutez vos informations de connexion dans le fichier `.env` :

     ```env
     DATABASE_URL=mysql://user:password@localhost:3306/nombase
     ```

5. **Démarrez l'application en mode développement**

   ```bash
   npm run dev
   ```

6. **Accédez à l'application**

   Accédez à l'application via [http://localhost:5173](http://localhost:5173).

## Structure du Projet

```plaintext
src/
├── components/
│   ├── paiements/
│   │   └── modifiePaiement.vue
│   ├── utilisateurs/
│   │   ├── ajoutUtilisateur.vue
│   │   ├── detailUtilisateur.vue
│   │   ├── listUtilisateur.vue
│   │   └── modifieUtilisateur.vue
│   ├── BarChart.vue
│   ├── DoughnutChart.vue
│   ├── Home.vue
│   ├── LineChart.vue
│   └── navbar.vue
├── plugins/
├── router/
│   └── index.js
├── stores/
│   ├── authStore.js
│   ├── clientStore.js
│   ├── factureStore.js
│   ├── index.js
│   ├── modePaiementStore.js
│   ├── paiementStore.js
│   └── utilisateurStore.js
├── App.vue
├── i18n.js
├── main.js
├── style.css
└── .gitignore
```

## Auteur

Développé par Fatoumacisse99.
