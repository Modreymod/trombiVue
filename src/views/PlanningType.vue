<template>
  <div class="container py-4">
    <h1>Planning Type</h1>
    <div v-if="planningType">
      <p class="font-weight-bold">Nom du planning : {{ planningType.inom }}</p>
      <!-- Boucle pour afficher les plages horaires pour chaque jour de la semaine -->
      <div class="row">
        <div v-for="jour in joursSemaine.slice(0, 7)" :key="jour" class="col-12 col-md-6 col-lg-4">
          <div class="card my-2">
            <div class="card-body">
              <h3 class="text-center">{{ getDayOfWeek(jour) }}</h3>
              <!-- Div pour afficher les informations de chaque plage horaire -->
              <div v-for="plage in filteredPlagesHoraires(jour)" :key="plage.id" class="plage-horaire" :class="{
                'matin': plage.nomPlage === 'matin',
                'apres-midi': plage.nomPlage === 'apres-midi',
                'bg-primary': plage.etat.nomEtat === 'Sur site',
                'bg-warning': plage.etat.nomEtat === 'Télétravail',
                'bg-danger': plage.etat.nomEtat === 'Déplacement',
                'bg-success': plage.etat.nomEtat === 'Repos'
              }">
                <div>Nom de la plage horaire : {{ plage.nomPlage }}</div>
                <div>Heure de début : {{ formatTime(plage.debut) }}</div>
                <div>Heure de fin : {{ formatTime(plage.fin) }}</div>
                <div>État : {{ plage.etat.nomEtat }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>



<script>
import axios from 'axios';
export default {
  props: {
    cfg: Object
  },
  data() {
    return {
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
    this.getDetailPlanning();
  },
  methods: {
    getDetailPlanning() {
      const id = 1; // l'ID du planning à récupérer
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
</style>