<template>
    <div class="container py-4">
      <div class="row justify-content-center align-items-center">
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
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="updateEmployeTel">
                <div class="form-group">
                  <label for="numero">Numéro Téléphone:</label>
                  <input type="text" class="form-control" id="numero" v-model="numero" />
                </div>
                <div class="form-group">
                  <label for="type1">Type:</label>
                  <select class="form-control" id="type1" v-model="type1">
                    <option value="Personnel">Personnel</option>
                    <option value="Professionnel">Professionnel</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary btn-spacing">Mettre à jour</button>
              </form>
              <div v-if="successMessageTel" class="alert alert-success mt-3">{{ successMessageTel }}</div>
              <div v-if="errorMessageTel" class="alert alert-danger mt-3">{{ errorMessageTel }}</div>
            </div>
          </div>
          <div class="card mt-4">
            <div class="card-body">
              <form @submit.prevent="updateEmployeMail">
                <div class="form-group">
                  <label for="adresse">Mail:</label>
                  <input type="text" class="form-control" id="adresse" v-model="adresse" />
                </div>
                <div class="form-group">
                  <label for="type2">Type:</label>
                  <select class="form-control" id="type2" v-model="type2">
                    <option value="Personnel">Personnel</option>
                    <option value="Professionnel">Professionnel</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary btn-spacing">Mettre à jour</button>
              </form>
              <div v-if="successMessageMail" class="alert alert-success mt-3">{{ successMessageMail }}</div>
              <div v-if="errorMessageMail" class="alert alert-danger mt-3">{{ errorMessageMail }}</div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="updateEmployeAdresse">
                <div class="form-group">
                  <label for="voie">Voie:</label>
                  <input type="text" class="form-control" id="voie" v-model="voie" />
                </div>
                <div class="form-group">
                  <label for="complement">Complément:</label>
                  <input type="text" class="form-control" id="complement" v-model="complement" />
                </div>
                <div class="form-group">
                  <label for="cp">Code Postal:</label>
                  <input type="text" class="form-control" id="cp" v-model="cp" />
                </div>
                <div class="form-group">
                  <label for="localite">Localité:</label>
                  <input type="text" class="form-control" id="localite" v-model="localite" />
                </div>
                <div class="form-group">
                  <label for="type3">Type:</label>
                  <select class="form-control" id="type3" v-model="type3">
                    <option value="Personnel">Personnel</option>
                    <option value="Professionnel">Professionnel</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary btn-spacing">Mettre à jour</button>
              </form>
              <div v-if="successMessageAdresse" class="alert alert-success mt-3">{{ successMessageAdresse }}</div>
              <div v-if="errorMessageAdresse" class="alert alert-danger mt-3">{{ errorMessageAdresse }}</div>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  
  
  <script>
  export default {
    props: {
      cfg: Object
    },
    data() {
      return {
        employe: null,
        numero: '',
        type1: '',
        adresse: '',
        type2: '',
        voie: '',
        complement: '',
        cp: '',
        localite: '',
        type3: '',
        successMessageTel: '',
        errorMessageTel: '',
        successMessageMail: '',
        errorMessageMail: '',
        successMessageAdresse: '',
        errorMessageAdresse: ''
      };
    },
    mounted() {
      this.getEmployeById();
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
      formatDate(date) {
        if (!date) return '';
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
      updateEmployeTel() {
        const id = 1;
        const url = `http://761epbg2b.amandine.cloud/api/structurePersonnel/POST/${id}/telephone/0`;
        const data = {
          numero: this.numero,
          type: this.type1
        };
  
        this.$app.apiPost(url, data)
          .then((response) => {
            this.employe.numero = response.numero;
            this.employe.type = response.type;
            this.numero = '';
            this.type1 = '';
            this.successMessageTel = 'Mise à jour réussie !';
            this.errorMessageTel = '';
          })
          .catch((error) => {
            console.error(error);
            this.successMessageTel = '';
            this.errorMessageTel = 'Erreur lors de la mise à jour du numéro de téléphone.';
          });
      },
      updateEmployeMail() {
        const id = 1;
        const url = `http://761epbg2b.amandine.cloud/api/structurePersonnel/POST/${id}/email/0`;
        const data = {
          adresse: this.adresse,
          type: this.type2
        };
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'adresse e-mail
  
        if (!emailRegex.test(this.adresse)) { // Vérifier si l'adresse e-mail est valide
          this.errorMessageMail = 'Adresse e-mail invalide !';
          return; // Arrêter l'exécution de la fonction si l'adresse e-mail est invalide
        }
  
        this.$app.apiPost(url, data)
          .then((response) => {
            this.employe.adresse = response.adresse;
            this.employe.type = response.type;
            this.adresse = '';
            this.type2 = '';
            this.successMessageMail = 'Mise à jour réussie !';
            this.errorMessageMail = '';
          })
          .catch((error) => {
            console.error(error);
            this.successMessageMail = '';
            this.errorMessageMail = 'Erreur lors de la mise à jour de l\'adresse e-mail.';
          });
      },
      updateEmployeAdresse() {
        const id = 1;
        const url = `http://761epbg2b.amandine.cloud/api/structurePersonnel/POST/${id}/adresse/0`;
        const data = {
          voie: this.voie,
          complement: this.complement,
          cp: this.cp,
          localite: this.localite,
          type: this.type3
        };
  
        this.$app.apiPost(url, data)
          .then((response) => {
            this.employe.voie = response.voie;
            this.employe.complement = response.complement;
            this.employe.cp = response.cp;
            this.employe.localite = response.localite;
            this.employe.type = response.type;
            this.voie = '';
            this.complement = '';
            this.cp = '';
            this.localite = '';
            this.type3 = '';
            this.successMessageAdresse = 'Mise à jour réussie !';
            this.errorMessageAdresse = '';
          })
          .catch((error) => {
            console.error(error);
            this.successMessageAdresse = '';
            this.errorMessageAdresse = 'Erreur lors de la mise à jour de l\'adresse.';
          });
      }
    }
  };
  </script>
  
  <style>
  .card {
    max-width: 300px;
  }
  .btn-spacing {
  margin-top: 10px;
}
  </style>
  