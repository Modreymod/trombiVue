<template>
    <div class="container py-4">
      <h1 class="text-center">Employés</h1>
      <div class="row">
        <div v-for="employe in employes" :key="employe.matricule" class="col-md-4">
          <div class="card mb-4">
            <img :src="employe.photo" class="card-img-top img-fluid" alt="Photo de l'employé">
            <div class="card-body">
              <p class="font-weight-bold">Matricule: {{ employe.matricule }}</p>
              <p class="card-text">Niveau Hiérarchique: {{ employe.niveau_hierarchique }}</p>
              <p class="card-text">N-1: {{ employe.n_1 }}</p>
              <p class="card-text">Nom: {{ employe.cache_nom }}</p>
              <p class="card-text">Date d'entrée: {{ formatDate(employe.dentree) }}</p>
              <p class="card-text" v-if="employe.dsortie">Date de sortie: {{ formatDate(employe.dsortie) }}</p>
              <p class="card-text">Initiales: {{ employe.initials }}</p>
              <router-link to="/employeForm" class="btn btn-primary">Formulaire Employé</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </template>
  
  <script>
 
  
  export default {
    props: {
      cfg: Object
    },
    data() {
      return {
        employes: [] 
      };
    },
    mounted() {
      this.getEmployes(); 
    },
    methods: {
      getEmployes() { 
        this.$app.apiGet('v2/personnel') 
          .then((data) => {
            this.employes = data; 
            this.employes.forEach((employe) => { 
              employe.photo = 'https://img.freepik.com/free-icon/user_318-563642.jpg';
            });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      formatDate(date) {
        if (!date) return ''; // Ne rien afficher si la date est null
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      }
    }
  };
  </script>
  <style>
  .card {
    max-width: 300px;
  }
  </style>