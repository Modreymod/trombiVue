<template>
    <div>
      <div class="container py-4">
        <div class="row">
          <!-- Colonne pour l'affichage de l'employé -->
          <div class="col-md-4">
            <h1 class="text-center">Employé</h1>
            <div v-if="employe" class="card">
              <div class="card-body">
                <img :src="employe.photo" class="card-img-top img-fluid" alt="Photo de l'employé">
                <div class="card-body">
                  <p class="font-weight-bold">Matricule : {{ employe.matricule }}</p>
                  <p class="card-text">Niveau Hiérarchique : {{ employe.niveau_hierarchique }}</p>
                  <p class="card-text">N-1: {{ employe.n_1 }}</p>
                  <p class="card-text">Nom : {{ employe.cache_nom }}</p>
                  <p class="card-text">Date d'entrée : {{ formatDate(employe.dentree) }}</p>
                  <p class="card-text" v-if="employe.dsortie">Date de sortie : {{ formatDate(employe.dsortie) }}</p>
                  <p class="card-text">Initiales : {{ employe.initials }}</p>
                  <router-link to="/employeForm" class="btn btn-primary">Formulaire Employé</router-link>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Colonne pour l'affichage du planning -->
          <div class="col-md-8">
            <h1>Planning Type</h1>
            <div v-if="planningType">
              <p class="font-weight-bold">Nom du planning : {{ planningType.inom }}</p>
              <div class="row">
                <div v-for="jour in joursSemaine.slice(0, 7)" :key="jour" class="col-12 col-md-6 col-lg-4">
                  <div class="card my-2">
                    <div class="card-body">
                      <h3 class="text-center">{{ getDayOfWeek(jour) }}</h3>
                      <div v-for="plage in filteredPlagesHoraires(jour)" :key="plage.id" class="plage-horaire" :class="{
                        'matin': plage.nomPlage === 'matin',
                        'apres-midi': plage.nomPlage === 'apres-midi',
                        'bg-primary': plage.etat.nomEtat === 'Sur site',
                        'bg-warning': plage.etat.nomEtat === 'Télétravail',
                        'bg-danger': plage.etat.nomEtat === 'Déplacement',
                        'bg-success': plage.etat.nomEtat === 'Repos'
                      }">
                        <div>{{ plage.nomPlage }} : {{ plage.etat.nomEtat }}</div>
                        <div>{{ formatTime(plage.debut) }} - {{ formatTime(plage.fin) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      cfg: Object
    },
    data() {
      return {
        employe: null,
        planningType: null,
        joursSemaine: [0, 1, 2, 3, 4, 5, 6],
      };
    },
    computed: {
      filteredPlagesHoraires() {
        return (jour) => {
          return this.planningType.plagesHoraires.filter(
            plage => plage.numJour === jour
          );
        };
      },
    },
    mounted() {
      this.getEmployeById();
      this.getDetailPlanning();
    },
    methods: {
      getEmployeById() {
        const id = 1;
        this.$app.apiGet('v2/personnel/' + id)
          .then((data) => {
            this.employe = data;
            this.employe.photo = 'https://img.freepik.com/free-icon/user_318-563642.jpg';
          })
          .catch((error) => {
            console.error(error);
          });
      },
      getDetailPlanning() {
        const id = 1;
        axios.get(`http://172.17.0.3/public/api/plannings/${id}`)
          .then(response => {
            this.planningType = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      getDayOfWeek(numJour) {
        const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        return joursSemaine[numJour];
      },
      formatTime(time) {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      },
      formatDate(date) {
        if (!date) return '';
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      }
    }
  };
  </script>
  
  <style>
  .bg-primary {
    background-color: #007bff !important;
    padding: 10px;
  }
  
  .bg-success {
    background-color: #28a745 !important;
    padding: 10px;
  }
  
  .bg-warning {
    background-color: #ffc107 !important;
    padding: 10px;
  }
  
  .bg-danger {
    background-color: #dc3545 !important;
    padding: 10px;
  }
  
  .card {
    max-width: 300px;
  }
  </style>
  