<template>
    <button @click="logout" class="btn btn-logout">Se Déconnecter</button>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .btn-logout {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .btn-logout:hover {
    background-color: #c82333;
  }
  </style>
  