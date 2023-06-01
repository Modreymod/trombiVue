<template>
  <div class="container py-4">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-8">
        <h1 class="text-center">Formulaire Employé</h1>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="saveEmploye">
              <div class="mb-3">
                <label for="matricule" class="form-label">Matricule :</label>
                <input v-model="formData.matricule" type="text" id="matricule" class="form-control">
              </div>
              <div class="mb-3">
                <label for="nom" class="form-label">Nom :</label>
                <input v-model="formData.cache_nom" type="text" id="nom" class="form-control">
              </div>
              <div class="mb-3">
                <label for="niveau_hierarchique" class="form-label">Niveau Hiérarchique :</label>
                <input v-model="formData.niveau_hierarchique" type="text" id="niveau_hierarchique" class="form-control">
              </div>
              <div class="mb-3">
                <label for="n_1" class="form-label">N-1 :</label>
                <input v-model="formData.n_1" type="text" id="n_1" class="form-control">
              </div>
              <div class="mb-3">
                <label for="date_entree" class="form-label">Date d'entrée :</label>
                <input v-model="formData.date_entree" type="date" id="date_entree" class="form-control">
              </div>
              <div class="mb-3">
                <label for="date_sortie" class="form-label">Date de sortie :</label>
                <input v-model="formData.date_sortie" type="date" id="date_sortie" class="form-control">
              </div>
              <div class="mb-3">
                <label for="initiales" class="form-label">Initiales :</label>
                <input v-model="formData.initials" type="text" id="initiales" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        matricule: '',
        nom: '',
        niveau_hierarchique: '',
        n_1: '',
        date_entree: '',
        date_sortie: '',
        initiales: ''
      }
    };
  },
  mounted() {
    this.getEmployeById();
  },
  methods: {
    getEmployeById() {
      const id = 1;
      this.$app
        .apiGet('v2/personnel/' + id)
        .then((data) => {
          this.formData = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveEmploye() {
      const id = 1;
      this.$app
        .apiPut('v2/personnel/' + id, this.formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
.card {
  max-width: 500px;
  margin: 0 auto;
}
</style>
