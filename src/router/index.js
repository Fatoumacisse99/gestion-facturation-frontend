// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../components/Home.vue';
// import Login from '../components/auth/Login.vue';

// // Clients
// import ListClient from '@/components/clients/listClient.vue';
// import AjoutClient from '@/components/clients/ajoutClient.vue';
// import ModifieClient from '@/components/clients/modifieClient.vue';
// import DetailClient from '@/components/clients/detailClient.vue';

// // Utilisateurs
// import ListUtilisateur from '../components/utilisateurs/listUtilisateur.vue';
// import AjoutUtilisateur from '../components/utilisateurs/ajoutUtilisateur.vue';
// import ModifieUtilisateur from '../components/utilisateurs/modifieUtilisateur.vue';
// import DetailUtilisateur from '../components/utilisateurs/detailUtilisateur.vue';

// // Factures
// import ListFacture from '@/components/factures/listFacture.vue';
// import AjoutFacture from '@/components/factures/ajoutFacture.vue';
// import ModifieFacture from '@/components/factures/modifieFacture.vue';
// import DetailFacture from '@/components/factures/detailFacture.vue'

// // Modes de Paiement
// import ListModePaiement from '@/components/modePaiements/listModePaiement.vue';
// import AjoutModePaiement from '@/components/modePaiements/ajoutModePaiement.vue';
// import ModifieModePaiement from '@/components/modePaiements/modifieModePaiement.vue';
// import DetailModePaiement from '../components/modePaiements/detailModePaiement.vue';

// // Paiements
// import ListPaiement from '@/components/paiements/listPaiement.vue';
// import AjoutPaiement from '@/components/paiements/ajoutPaiement.vue';
// import ModifiePaiement from '@/components/paiements/modifiePaiement.vue';
// import DetailPaiement from '@/components/paiements/detailPaiement.vue';

// const routes = [
//   { path: '/', redirect: '/login' }, // Redirect root to login
//   { path: '/login', component: Login, meta: { requiresAuth: false } },
//   { path: '/home', component: Home, meta: { requiresAuth: true } },

//   // Routes pour les Clients
//   { path: '/clients', name: 'ListClient', component: ListClient, meta: { title: 'Liste des Clients', requiresAuth: true } },
//   { path: '/clients/ajout', name: 'AjoutClient', component: AjoutClient, meta: { title: 'Ajouter un Client', requiresAuth: true } },
//   { path: '/clients/modifie/:id', name: 'ModifieClient', component: ModifieClient, meta: { title: 'Modifier un Client', requiresAuth: true }, props: true },
//   { path: '/clients/detail/:id', name: 'DetailClient', component: DetailClient, meta: { title: 'Détails du Client', requiresAuth: true }, props: true },

//   // Routes pour les Utilisateurs
//   { path: '/utilisateurs', name: 'ListUtilisateurs', component: ListUtilisateur, meta: { title: 'Liste des Utilisateurs', requiresAuth: true } },
//   { path: '/utilisateurs/ajout', name: 'AjoutUtilisateur', component: AjoutUtilisateur, meta: { title: 'Ajouter un Utilisateur', requiresAuth: true } },
//   { path: '/utilisateurs/modifie/:id', name: 'ModifieUtilisateur', component: ModifieUtilisateur, meta: { title: 'Modifier un Utilisateur', requiresAuth: true }, props: true },
//   { path: '/utilisateurs/detail/:id', name: 'DetailUtilisateur', component: DetailUtilisateur, meta: { title: 'Détails de l\'Utilisateur', requiresAuth: true }, props: true },

//   // Routes pour les Factures
//   { path: '/factures', name: 'ListFacture', component: ListFacture, meta: { title: 'Liste des Factures', requiresAuth: true } },
//   { path: '/factures/ajout', name: 'AjoutFacture', component: AjoutFacture, meta: { title: 'Ajouter une Facture', requiresAuth: true } },
//   { path: '/factures/modifie/:id', name: 'ModifieFacture', component: ModifieFacture, meta: { title: 'Modifier une Facture', requiresAuth: true }, props: true },
//   { path: '/factures/detail/:id', name: 'DetailFacture', component: DetailFacture, meta: { title: 'Détails de la Facture', requiresAuth: true }, props: true },

 
//   // Routes pour les Modes de Paiement
//   { path: '/modePaiements', name: 'ListModePaiement', component: ListModePaiement, meta: { title: 'Liste des Modes de Paiement', requiresAuth: true } },
//   { path: '/modePaiements/ajout', name: 'AjoutModePaiement', component: AjoutModePaiement, meta: { title: 'Ajouter un Mode de Paiement', requiresAuth: true } },
//   { path: '/modePaiements/modifie/:id', name: 'ModifieModePaiement', component: ModifieModePaiement, meta: { title: 'Modifier un Mode de Paiement', requiresAuth: true }, props: true },
//   { path: '/modePaiements/detail/:id', name: 'DetailModePaiement', component: DetailModePaiement, meta: { title: 'Détails du Mode de Paiement', requiresAuth: true }, props: true },

//   // Routes pour les Paiements
//   { path: '/paiements', name: 'ListPaiement', component: ListPaiement, meta: { title: 'Liste des Paiements', requiresAuth: true } },
//   { path: '/paiements/ajout', name: 'AjoutPaiement', component: AjoutPaiement, meta: { title: 'Ajouter un Paiement', requiresAuth: true } },
//   { path: '/paiements/modifie/:id', name: 'ModifiePaiement', component: ModifiePaiement, meta: { title: 'Modifier un Paiement', requiresAuth: true }, props: true },
//   { path: '/paiements/detail/:id', name: 'DetailPaiement', component: DetailPaiement, meta: { title: 'Détails du Paiement', requiresAuth: true }, props: true },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // Navigation guard to check authentication status
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   if (to.meta.requiresAuth && !isLoggedIn) {
//     next('/login'); // Redirect to login if not authenticated
//   } else {
//     next(); // Proceed if authenticated or route does not require auth
//   }
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';

// Clients
import ListClient from '@/components/clients/listClient.vue';
import AjoutClient from '@/components/clients/ajoutClient.vue';
import ModifieClient from '@/components/clients/modifieClient.vue';
import DetailClient from '@/components/clients/detailClient.vue';

// Utilisateurs
import ListUtilisateur from '../components/utilisateurs/listUtilisateur.vue';
import AjoutUtilisateur from '../components/utilisateurs/ajoutUtilisateur.vue';
import ModifieUtilisateur from '../components/utilisateurs/modifieUtilisateur.vue';
import DetailUtilisateur from '../components/utilisateurs/detailUtilisateur.vue';

// Factures
import ListFacture from '@/components/factures/listFacture.vue';
import AjoutFacture from '@/components/factures/ajoutFacture.vue';
import ModifieFacture from '@/components/factures/modifieFacture.vue';
import DetailFacture from '@/components/factures/detailFacture.vue'

// Modes de Paiement
import ListModePaiement from '@/components/modePaiements/listModePaiement.vue';
import AjoutModePaiement from '@/components/modePaiements/ajoutModePaiement.vue';
import ModifieModePaiement from '@/components/modePaiements/modifieModePaiement.vue';
import DetailModePaiement from '../components/modePaiements/detailModePaiement.vue';

// Paiements
import ListPaiement from '@/components/paiements/listPaiement.vue';
import AjoutPaiement from '@/components/paiements/ajoutPaiement.vue';
import ModifiePaiement from '@/components/paiements/modifiePaiement.vue';
import DetailPaiement from '@/components/paiements/detailPaiement.vue';

// Profile
import Profile from '../components/auth/ProfilePage.vue';  // Page de Profil

const routes = [
  { path: '/', redirect: '/login' }, // Redirect root to login
  { path: '/login', component: Login, meta: { requiresAuth: false } },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },  // Ajouter la route de profil

  // Routes pour les Clients
  { path: '/clients', name: 'ListClient', component: ListClient, meta: { title: 'Liste des Clients', requiresAuth: true } },
  { path: '/clients/ajout', name: 'AjoutClient', component: AjoutClient, meta: { title: 'Ajouter un Client', requiresAuth: true } },
  { path: '/clients/modifie/:id', name: 'ModifieClient', component: ModifieClient, meta: { title: 'Modifier un Client', requiresAuth: true }, props: true },
  { path: '/clients/detail/:id', name: 'DetailClient', component: DetailClient, meta: { title: 'Détails du Client', requiresAuth: true }, props: true },

  // Routes pour les Utilisateurs
  { path: '/utilisateurs', name: 'ListUtilisateurs', component: ListUtilisateur, meta: { title: 'Liste des Utilisateurs', requiresAuth: true } },
  { path: '/utilisateurs/ajout', name: 'AjoutUtilisateur', component: AjoutUtilisateur, meta: { title: 'Ajouter un Utilisateur', requiresAuth: true } },
  { path: '/utilisateurs/modifie/:id', name: 'ModifieUtilisateur', component: ModifieUtilisateur, meta: { title: 'Modifier un Utilisateur', requiresAuth: true }, props: true },
  { path: '/utilisateurs/detail/:id', name: 'DetailUtilisateur', component: DetailUtilisateur, meta: { title: 'Détails de l\'Utilisateur', requiresAuth: true }, props: true },

  // Routes pour les Factures
  { path: '/factures', name: 'ListFacture', component: ListFacture, meta: { title: 'Liste des Factures', requiresAuth: true } },
  { path: '/factures/ajout', name: 'AjoutFacture', component: AjoutFacture, meta: { title: 'Ajouter une Facture', requiresAuth: true } },
  { path: '/factures/modifie/:id', name: 'ModifieFacture', component: ModifieFacture, meta: { title: 'Modifier une Facture', requiresAuth: true }, props: true },
  { path: '/factures/detail/:id', name: 'DetailFacture', component: DetailFacture, meta: { title: 'Détails de la Facture', requiresAuth: true }, props: true },

  // Routes pour les Modes de Paiement
  { path: '/modePaiements', name: 'ListModePaiement', component: ListModePaiement, meta: { title: 'Liste des Modes de Paiement', requiresAuth: true } },
  { path: '/modePaiements/ajout', name: 'AjoutModePaiement', component: AjoutModePaiement, meta: { title: 'Ajouter un Mode de Paiement', requiresAuth: true } },
  { path: '/modePaiements/modifie/:id', name: 'ModifieModePaiement', component: ModifieModePaiement, meta: { title: 'Modifier un Mode de Paiement', requiresAuth: true }, props: true },
  { path: '/modePaiements/detail/:id', name: 'DetailModePaiement', component: DetailModePaiement, meta: { title: 'Détails du Mode de Paiement', requiresAuth: true }, props: true },

  // Routes pour les Paiements
  { path: '/paiements', name: 'ListPaiement', component: ListPaiement, meta: { title: 'Liste des Paiements', requiresAuth: true } },
  { path: '/paiements/ajout', name: 'AjoutPaiement', component: AjoutPaiement, meta: { title: 'Ajouter un Paiement', requiresAuth: true } },
  { path: '/paiements/modifie/:id', name: 'ModifiePaiement', component: ModifiePaiement, meta: { title: 'Modifier un Paiement', requiresAuth: true }, props: true },
  { path: '/paiements/detail/:id', name: 'DetailPaiement', component: DetailPaiement, meta: { title: 'Détails du Paiement', requiresAuth: true }, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Gardien de navigation pour vérifier l'authentification
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login'); // Redirige vers la page de connexion si non authentifié
  } else {
    next(); // Continue si l'utilisateur est authentifié ou si la route ne nécessite pas d'authentification
  }
});

export default router;

